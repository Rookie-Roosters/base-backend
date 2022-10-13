import { AutomationInputConstant } from '@automation/blocks/inputs/input-constant';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AutomationInputConstantService {
  exec(block: AutomationInputConstant): number | boolean {
    return block.value;
  }

  getOutputType(block: AutomationInputConstant): 'number' | 'boolean' {
    if (block.value === false || block.value === true) return 'boolean';
    else return 'number';
  }
}
