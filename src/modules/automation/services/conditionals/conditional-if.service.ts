import { AutomationConditionalIf } from '@automation/blocks/conditionals/conditional-if';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { Injectable, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationConditionalIfService implements AutomationCommonClass<AutomationConditionalIf> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  public type: string = 'conditionalIf';

  async exec(block: AutomationConditionalIf, company?: number): Promise<boolean> {
    const input1Type = await this.automationCommonService.getOutputType(block.input1, company);
    const input2Type = await this.automationCommonService.getOutputType(block.input2, company);
    if ((input1Type == 'number' || input1Type == 'date') && (input2Type == 'number' || input2Type == 'date')) {
      if (input1Type == input2Type) {
        const value1 = await this.automationCommonService.exec(block.input1, company);
        const value2 = await this.automationCommonService.exec(block.input2, company);
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
          default:
            throw new ForbiddenException('if operator must be valid');
        }
      } else throw new ForbiddenException('if parameters types must be equal');
    } else throw new ForbiddenException('if parameters types must be boolean or number');
  }

  async save(block: AutomationConditionalIf, automation: AutomationEntity): Promise<void> {
    await this.automationCommonService.save(block.input1, automation);
    await this.automationCommonService.save(block.input2, automation);
  }

  async getOutputType(block: AutomationConditionalIf, company?: number): Promise<'boolean'> {
    return 'boolean';
  }
}
