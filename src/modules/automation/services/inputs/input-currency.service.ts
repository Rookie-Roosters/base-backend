import { AutomationInputCurrency } from '@automation/blocks';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { Convert } from 'easy-currencies';
import { CURRENCIES } from '@core/constants/currencies.constant';

@Injectable()
export class AutomationInputCurrencyService implements AutomationCommonClass<AutomationInputCurrency> {
  public type: string = 'inputCurrency';

  private async validateCurrency(value: string) {
    for (const currency of CURRENCIES) {
      if (value.toUpperCase() == currency) {
        return true;
      }
    }
    return false;
  }

  async exec(block: AutomationInputCurrency, company?: number): Promise<number> {
    if (await this.validateCurrency(block.from) && await this.validateCurrency(block.to)) {
      return await Convert(1).from(block.from.toUpperCase()).to(block.to.toUpperCase());
    } else throw new ForbiddenException('Currency must exits');
  }

  async save(block: AutomationInputCurrency, automation: AutomationEntity): Promise<void> {
    //check if the currencies are valid
  }

  async getOutputType(block: AutomationInputCurrency, company?: number): Promise<'number'> {
    return 'number';
  }
}
