import { Injectable, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { AutomationInputVariable } from '@automation/blocks';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AutomationOutputVariableEntity } from '@automation/entities/output/output-variable.entity';
import { Repository } from 'typeorm';
import { AutomationInputVariableEntity } from '@automation/entities/inputs/input-variable.entity';
import * as fs from 'fs';
import { STORAGE_PATHS } from '@core/constants/storage_paths.constant';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationInputVariableService implements AutomationCommonClass<AutomationInputVariable> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
    @InjectRepository(AutomationOutputVariableEntity)
    private automationOutputVariablesRepository: Repository<AutomationOutputVariableEntity>,
    @InjectRepository(AutomationInputVariableEntity)
    private automationInputVariablesRepository: Repository<AutomationInputVariableEntity>,
  ) {}

  public type: string = 'inputVariable';

  async exec(block: AutomationInputVariable, company?: number): Promise<number | boolean> {
    const outputVariable = await this.automationOutputVariablesRepository.findOne({
      where: {
        automation: {
          company,
        },
        name: block.name,
      },
      relations: {
        automation: true,
      },
    });
    if (outputVariable) {
      if (!outputVariable.automation.draft) {
        const json = fs.readFileSync(`${STORAGE_PATHS.AUTOMATION}/${outputVariable.automation.filename}.json`);
        const automation = JSON.parse(json as unknown as string);
        return this.automationCommonService.exec(automation.output, company);
      } else throw new ForbiddenException('The Automation input variable must not be a draft');
    } else throw new ForbiddenException('Output variable does not exist');
  }

  async save(block: AutomationInputVariable, automation: AutomationEntity): Promise<void> {
    const variable = await this.automationOutputVariablesRepository.findOne({
      where: {
        automation: {
          company: automation.company,
        },
        name: block.name,
      },
      relations: {
        automation: true,
      },
    });
    if (variable) {
      if (!variable.automation.draft) {
        await this.automationInputVariablesRepository.save({
          automation: automation,
          name: block.name,
        });
      } else throw new ForbiddenException('The Automation input variable must not be a draft');
    } else throw new ForbiddenException('Variable must exists');
  }

  async getOutputType(block: AutomationInputVariable, company?: number): Promise<any> {
    const outputVariable = await this.automationOutputVariablesRepository.findOne({
      where: {
        automation: {
          company,
        },
        name: block.name,
      },
      relations: {
        automation: true,
      },
    });
    if (outputVariable) {
      if (!outputVariable.automation.draft) {
        const json = fs.readFileSync(`${STORAGE_PATHS.AUTOMATION}/${outputVariable.automation.filename}.json`);
        const automation = JSON.parse(json as unknown as string);
        return this.automationCommonService.getOutputType(automation.output, company);
      } else throw new ForbiddenException('The Automation input variable must not be a draft');
    } else throw new ForbiddenException('Output variable does not exist');
  }
}
