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

  async exec(block: AutomationConditionalNot): Promise<boolean> {
    const inputType = await this.automationCommonService.getOutputType(block.input);
    if (inputType == 'boolean' || inputType == 'number') {
      return !(await this.automationCommonService.exec(block.input)) as boolean;
    } else throw new ForbiddenException('not parameters types must be boolean');
  }

  async save(block: AutomationConditionalNot, automation: AutomationEntity): Promise<void> {
    await this.automationCommonService.save(block.input, automation);
  }

  async getOutputType(block: AutomationConditionalNot): Promise<'boolean'> {
    return 'boolean';
  }
}
