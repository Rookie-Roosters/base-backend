import { Automation, AutomationOutputChart } from '@automation/blocks';
import { AutomationEntity } from '@automation/entities/automation.entity';
import {
  AutomationOutputChartActionEntity,
  AutomationOutputChartEntity,
  AutomationOutputChartValueEntity,
} from '@automation/entities/output';
import { STORAGE_PATHS } from '@core/constants/storage_paths.constant';
import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';
import * as fs from 'fs';

@Injectable()
export class AutomationOutputChartService implements AutomationCommonClass<AutomationOutputChart> {
  public type: string = 'outputChart';

  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
    @InjectRepository(AutomationOutputChartEntity)
    private automationOutputChartsRepository: Repository<AutomationOutputChartEntity>,
    @InjectRepository(AutomationOutputChartActionEntity)
    private automationOutputChartActionsRepository: Repository<AutomationOutputChartActionEntity>,
    @InjectRepository(AutomationOutputChartValueEntity)
    private automationOutputChartValuesRepository: Repository<AutomationOutputChartValueEntity>,
    @InjectRepository(AutomationEntity)
    private automationRepository: Repository<AutomationEntity>,
  ) {}

  async exec(block: AutomationOutputChart, company?: number): Promise<{ date: Date; value: number }[]> {
    const values = await this.automationOutputChartValuesRepository.find({
      where: {
        outputChart: {
          name: block.name,
          automation: {
            company: {
              id: company,
            },
          },
        },
      },
    });
    const res = values.map((value) => {
      return { date: value.date, value: value.value };
    });
    res.push({
      date: new Date(),
      value: await this.automationCommonService.exec(block.input, company),
    });
    return res;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async repeat() {
    const outputCharts = await this.automationOutputChartsRepository.find({
      relations: {
        automation: true,
      },
    });
    await Promise.all(
      outputCharts.map(async (outputChart) => {
        if (!outputChart.automation.draft) {
          const json = fs.readFileSync(`${STORAGE_PATHS.AUTOMATION}/${outputChart.automation.filename}.json`);
          const automation = JSON.parse(json as unknown as string) as Automation;
          const company = (
            await this.automationRepository.findOne({
              where: {
                id: outputChart.automation.id,
              },
              relations: {
                company: true,
              },
            })
          ).company.id;
          await this.automationOutputChartValuesRepository.save({
            outputChart,
            value: await this.automationCommonService.exec(automation.output.input, company),
          });
        }
      }),
    );
  }

  async save(block: AutomationOutputChart, automation: AutomationEntity): Promise<void> {
    if (
      !(await this.automationOutputChartsRepository.findOne({
        where: {
          automation: {
            company: automation.company,
          },
          name: block.name,
        },
      }))
    ) {
      const createdOutputChart = await this.automationOutputChartsRepository.save({
        automation,
        name: block.name,
      });
      if (createdOutputChart) {
        await Promise.all(
          block.actions.map(async (action) => {
            await this.automationOutputChartActionsRepository.save({
              outputChart: createdOutputChart,
              name: action.name,
              url: action.url,
            });
          }),
        );
      } else throw new ForbiddenException('Output chart not created');
    } else throw new ForbiddenException('Output chart must not already exits');
    await this.automationCommonService.save(block.input, automation);
  }

  async getOutputType(block: AutomationOutputChart, company?: number): Promise<'number[]'> {
    return 'number[]';
  }
}
