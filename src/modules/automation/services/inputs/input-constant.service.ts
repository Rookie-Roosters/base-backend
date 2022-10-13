import { AutomationInputConstant } from '@automation/blocks/inputs/input-constant';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { Injectable } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';

@Injectable()
export class AutomationInputConstantService implements AutomationCommonClass<AutomationInputConstant> {
  async exec(block: AutomationInputConstant): Promise<number | boolean> {
    return block.value;
  }

  async save(block: AutomationInputConstant, automation: AutomationEntity): Promise<void> {}

  async getOutputType(block: AutomationInputConstant): Promise<'number' | 'boolean'> {
    if (block.value === false || block.value === true) return 'boolean';
    else return 'number';
  }
}
