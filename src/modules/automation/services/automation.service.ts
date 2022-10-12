import { Automation } from '@automation/classes/automation';
import { AutomationOutputTypes } from '@automation/types/output.type';
import { Injectable } from '@nestjs/common';
import { AutomationCommonService } from './common/common.service';

@Injectable()
export class AutomationService {
  constructor(
    private automationCommonService: AutomationCommonService,
  ) {}

  private exec(block: AutomationOutputTypes) {
    return this.automationCommonService.exec(block);
  }

  async create(automation: Automation) {
    const res = this.exec(automation.output);
    return res;
  }
}
