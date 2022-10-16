import { AutomationOutputVariable } from '@automation/blocks';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { AutomationOutputVariableActionEntity, AutomationOutputVariableEntity } from '@automation/entities/output';
import { Injectable, forwardRef, Inject, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationOutputVariableService implements AutomationCommonClass<AutomationOutputVariable> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
    @InjectRepository(AutomationOutputVariableEntity)
    private automationOutputVariablesRepository: Repository<AutomationOutputVariableEntity>,
    @InjectRepository(AutomationOutputVariableActionEntity)
    private automationOutputVariablesActionsRepository: Repository<AutomationOutputVariableActionEntity>,
  ) {}

  public type: string = 'outputVariable';

  async exec(block: AutomationOutputVariable, company?: number): Promise<number | boolean> {
    const inputType = await this.automationCommonService.getOutputType(block.input, company);
    if (inputType == 'boolean' || inputType == 'number') {
      return await this.automationCommonService.exec(block.input, company);
    } else throw new ForbiddenException('output variable parameters types must be boolean or number');
  }

  async save(block: AutomationOutputVariable, automation: AutomationEntity): Promise<void> {
    if (
      !(await this.automationOutputVariablesRepository.findOne({
        where: {
          automation: {
            company: automation.company,
          },
          name: block.name,
        },
      }))
    ) {
      const createdOutputVariable = await this.automationOutputVariablesRepository.save({
        automation,
        name: block.name,
      });
      if (createdOutputVariable) {
        await Promise.all(
          block.actions.map(async (action) => {
            await this.automationOutputVariablesActionsRepository.save({
              outputVariable: createdOutputVariable,
              name: action.name,
              url: action.url,
            });
          }),
        );
      } else throw new ForbiddenException('Output variable not created');
    } else throw new ForbiddenException('Output variable already exists');
    await this.automationCommonService.save(block.input, automation);
  }

  async getOutputType(block: AutomationOutputVariable, company?: number): Promise<'number' | 'boolean'> {
    return this.automationCommonService.getOutputType(block.input, company) as Promise<'number' | 'boolean'>;
  }
}
