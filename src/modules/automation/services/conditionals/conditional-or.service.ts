import { AutomationConditionalOr } from '@automation/blocks/conditionals/conditional-or';
import { Injectable, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationConditionalOrService implements AutomationCommonClass<AutomationConditionalOr> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  async exec(block: AutomationConditionalOr): Promise<boolean> {
    const input1type = await this.automationCommonService.getOutputType(block.input1);
    const input2type = await this.automationCommonService.getOutputType(block.input2);
    if (input1type == 'boolean' && input2type == 'boolean') {
      const value1 = (await this.automationCommonService.exec(block.input1)) as boolean;
      const value2 = (await this.automationCommonService.exec(block.input2)) as boolean;
      return value1 || value2;
    } else throw new ForbiddenException('or parameters types must be boolean');
  }

  async getOutputType(block: AutomationConditionalOr): Promise<'boolean'> {
    return 'boolean';
  }
}
