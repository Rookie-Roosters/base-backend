import { AutomationOutputVariable } from '@automation/blocks/outputs/output-variable';
import { Injectable, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationOutputVariableService implements AutomationCommonClass<AutomationOutputVariable> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  async exec(block: AutomationOutputVariable): Promise<number | boolean> {
    const inputType = await this.automationCommonService.getOutputType(block.input);
    if (inputType == 'boolean' || inputType == 'number') {
      return this.automationCommonService.exec(block.input);
    } else throw new ForbiddenException('output variable parameters types must be boolean or number');
  }

  async getOutputType(block: AutomationOutputVariable): Promise<'number' | 'boolean'> {
    return this.automationCommonService.getOutputType(block.input) as Promise<'number' | 'boolean'>;
  }
}
