import { Automation, AutomationInputDateNow } from '@automation/blocks';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { AutomationInputDateNowEntity } from '@automation/entities/inputs/input-date-now.entity';
import { STORAGE_PATHS } from '@core/constants/storage_paths.constant';
import { ForbiddenException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomationCommonClass } from '../common/common.class';
import * as fs from 'fs';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationInputDateNowService implements AutomationCommonClass<AutomationInputDateNow> {
  public type: string = 'inputDateNow';

  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
    @InjectRepository(AutomationInputDateNowEntity)
    private inputDateNowRepository: Repository<AutomationInputDateNowEntity>,
    @InjectRepository(AutomationEntity)
    private automationRepository: Repository<AutomationEntity>,
  ) {}

  async exec(block: AutomationInputDateNow, company?: number): Promise<Date> {
    return new Date();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async repeat() {
    const inputDateNows = await this.inputDateNowRepository.find({
      relations: {
        automation: true,
      }
    });
    await Promise.all(inputDateNows.map(async (inputDateNow) => {
      if(!inputDateNow.automation.draft) {
        const json = fs.readFileSync(`${STORAGE_PATHS.AUTOMATION}/${inputDateNow.automation.filename}.json`);
        const automation = JSON.parse(json as unknown as string) as Automation;
        const foundAutomation = await this.automationRepository.findOne({
          where: {
            id: inputDateNow.automation.id
          },
          relations: {
            company: true
          }
        })
        await this.automationCommonService.exec(automation.output, foundAutomation.company.id);
      }
    }));
  }

  async save(block: AutomationInputDateNow, automation: AutomationEntity): Promise<void> {
    const createdInputDateNow = await this.inputDateNowRepository.save({
      automation,
    });
    if (!createdInputDateNow) throw new ForbiddenException('Date Now Entity not created');
  }

  async getOutputType(block: AutomationInputDateNow, company?: number): Promise<'date'> {
    return 'date';
  }
}
