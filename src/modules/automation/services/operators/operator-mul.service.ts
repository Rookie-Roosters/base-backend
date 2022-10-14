import { AutomationOperatorMul } from '@automation/blocks/operators';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationOperatorMulService implements AutomationCommonClass<AutomationOperatorMul> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  public type: string = 'operatorMul';

  async exec(block: AutomationOperatorMul, company?: number): Promise<number> {
    const input1type = await this.automationCommonService.getOutputType(block.input1, company);
    const input2type = await this.automationCommonService.getOutputType(block.input2, company);
    if (input1type == 'number' && input2type == 'number') {
      const value1 = (await this.automationCommonService.exec(block.input1, company)) as number;
      const value2 = (await this.automationCommonService.exec(block.input2, company)) as number;
      return value1 * value2;
    } else throw new ForbiddenException('operator mul parameters types must be boolean');
  }

  async save(block: AutomationOperatorMul, automation: AutomationEntity): Promise<void> {
    await this.automationCommonService.save(block.input1, automation);
    await this.automationCommonService.save(block.input2, automation);
  }

  async getOutputType(block: AutomationOperatorMul, company?: number): Promise<'boolean'> {
    return 'boolean';
  }
}