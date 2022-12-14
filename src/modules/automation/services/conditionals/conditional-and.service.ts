import { AutomationConditionalAnd } from '@automation/blocks/conditionals/conditional-and';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { Injectable, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationConditionalAndService implements AutomationCommonClass<AutomationConditionalAnd> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  public type: string = 'conditionalAnd';

  async exec(block: AutomationConditionalAnd, company?: number): Promise<boolean> {
    const input1type = await this.automationCommonService.getOutputType(block.input1, company);
    const input2type = await this.automationCommonService.getOutputType(block.input2, company);
    if (input1type == 'boolean' && input2type == 'boolean') {
      const value1 = (await this.automationCommonService.exec(block.input1, company)) as boolean;
      const value2 = (await this.automationCommonService.exec(block.input2, company)) as boolean;
      return value1 && value2;
    } else throw new ForbiddenException('and parameters types must be boolean');
  }

  async save(block: AutomationConditionalAnd, automation: AutomationEntity): Promise<void> {
    await this.automationCommonService.save(block.input1, automation);
    await this.automationCommonService.save(block.input2, automation);
  }

  async getOutputType(block: AutomationConditionalAnd, company?: number): Promise<'boolean'> {
    return 'boolean';
  }
}
