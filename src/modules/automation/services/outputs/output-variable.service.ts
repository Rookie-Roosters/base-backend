import { AutomationOutputVariable } from '@automation/blocks/outputs/output-variable';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { AutomationInputVariableEntity } from '@automation/entities/inputs/input-variable.entity';
import { AutomationOutputVariableEntity } from '@automation/entities/output/output-variable.entity';
import { Injectable, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
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
    )
      await this.automationOutputVariablesRepository.save({
        automation,
        name: block.name,
      });
    else throw new ForbiddenException('Output variable already exists');
    await this.automationCommonService.save(block.input, automation);
  }

  async getOutputType(block: AutomationOutputVariable, company?: number): Promise<'number' | 'boolean'> {
    return this.automationCommonService.getOutputType(block.input, company) as Promise<'number' | 'boolean'>;
  }
}
