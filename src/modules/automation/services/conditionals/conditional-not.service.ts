import { AutomationConditionalNot } from '@automation/blocks/conditionals/conditional-not';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { Injectable, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationConditionalNotService implements AutomationCommonClass<AutomationConditionalNot> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  public type: string = 'conditionalNot';

  async exec(block: AutomationConditionalNot, company?: number): Promise<boolean> {
    const inputType = await this.automationCommonService.getOutputType(block.input, company);
    if (inputType == 'boolean' || inputType == 'number') {
      return !(await this.automationCommonService.exec(block.input, company)) as boolean;
    } else throw new ForbiddenException('not parameters types must be boolean');
  }

  async save(block: AutomationConditionalNot, automation: AutomationEntity): Promise<void> {
    await this.automationCommonService.save(block.input, automation);
  }

  async getOutputType(block: AutomationConditionalNot, company?: number): Promise<'boolean'> {
    return 'boolean';
  }
}
