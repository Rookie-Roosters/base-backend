import { AutomationOutputVariable } from '@automation/classes/outputs/output-variable';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationOutputVariableService
  implements AutomationCommonClass<AutomationOutputVariable>
{
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  async exec(block: AutomationOutputVariable): Promise<number | boolean> {
    return this.automationCommonService.exec(block);
  }

  async getOutputType(block: AutomationOutputVariable): Promise<'number' | 'boolean'> {
      return this.automationCommonService.getOutputType(block.input);
  }
}
