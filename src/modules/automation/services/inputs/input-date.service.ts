import { AutomationInputDate } from '@automation/blocks';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';

@Injectable()
export class AutomationInputDateService implements AutomationCommonClass<AutomationInputDate> {
  public type: string = 'inputDate';

  async exec(block: AutomationInputDate, company?: number): Promise<Date> {
    return new Date(block.value);
  }

  async save(block: AutomationInputDate, automation: AutomationEntity): Promise<void> {
    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(block.value)) {
      throw new ForbiddenException('Date must be mm/dd/yyyy');
    }
  }

  async getOutputType(block: AutomationInputDate, company?: number): Promise<'date'> {
    return 'date';
  }
}
