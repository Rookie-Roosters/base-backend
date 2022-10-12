import { AutomationConditionalIf } from '@automation/classes/conditionals/conditional-if';
import { Injectable, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationConditionalIfService implements AutomationCommonClass<AutomationConditionalIf> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  async exec(block: AutomationConditionalIf): Promise<boolean> {
    const input1Type = this.automationCommonService.getOutputType(block.input1);
    const input2Type = this.automationCommonService.getOutputType(block.input2);
    if (input1Type == input2Type) {
      const value1 = this.automationCommonService.exec(block.input1);
      const value2 = this.automationCommonService.exec(block.input2);
      switch (block.operator) {
        case '=':
          return value1 == value2;
        case '!=':
          return value1 != value2;
        case '<':
          return value1 < value2;
        case '>':
          return value1 > value2;
        case '<=':
          return value1 <= value2;
        case '>=':
          return value2 >= value2;
      }
    } else throw new ForbiddenException("if parameters types must be equal");
  }

  async getOutputType(block: AutomationConditionalIf): Promise<'boolean'> {
    return 'boolean';
  }
}
