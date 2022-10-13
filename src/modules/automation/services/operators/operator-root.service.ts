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

  async exec(block: AutomationOperatorRoot): Promise<number> {
    const input1type = await this.automationCommonService.getOutputType(block.input1);
    const input2type = await this.automationCommonService.getOutputType(block.input2);
    if (input1type == 'number' && input2type == 'number') {
      const value1 = (await this.automationCommonService.exec(block.input1)) as number;
      const value2 = (await this.automationCommonService.exec(block.input2)) as number;
      return Math.exp((1 / value2) * Math.log(value1));
    } else throw new ForbiddenException('operator sub parameters types must be boolean');
  }

  async save(block: AutomationOperatorRoot, automation: AutomationEntity): Promise<void> {
    await this.automationCommonService.save(block.input1, automation);
    await this.automationCommonService.save(block.input2, automation);
  }

  async getOutputType(block: AutomationOperatorRoot): Promise<'boolean'> {
    return 'boolean';
  }
}
