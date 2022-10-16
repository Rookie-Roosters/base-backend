import { AutomationOperatorRoot } from '@automation/blocks/operators';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationOperatorRootService implements AutomationCommonClass<AutomationOperatorRoot> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  public type: string = 'operatorRoot';

  async exec(block: AutomationOperatorRoot, company?: number): Promise<number> {
    const input1type = await this.automationCommonService.getOutputType(block.input1, company);
    const input2type = await this.automationCommonService.getOutputType(block.input2, company);
    if (input1type == 'number' && input2type == 'number') {
      const value1 = (await this.automationCommonService.exec(block.input1, company)) as number;
      const value2 = (await this.automationCommonService.exec(block.input2, company)) as number;
      return Math.exp((1 / value2) * Math.log(value1));
    } else throw new ForbiddenException('operator sub parameters types must be boolean');
  }

  async save(block: AutomationOperatorRoot, automation: AutomationEntity): Promise<void> {
    await this.automationCommonService.save(block.input1, automation);
    await this.automationCommonService.save(block.input2, automation);
  }

  async getOutputType(block: AutomationOperatorRoot, company?: number): Promise<'boolean'> {
    return 'boolean';
  }
}
