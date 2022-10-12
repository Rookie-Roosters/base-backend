import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AutomationConditionalIfService } from '../conditionals/conditional-if.service';
import { AutomationInputConstantService } from '../inputs/input-constant.service';
import { AutomationOutputVariableService } from '../outputs/output-variable.service';

@Injectable()
export class AutomationCommonService {
  constructor(
    @Inject(forwardRef(() => AutomationOutputVariableService)) private automationOutputVariableService: AutomationOutputVariableService,
    @Inject(forwardRef(() => AutomationInputConstantService)) private automationInputConstantService: AutomationInputConstantService,
    @Inject(forwardRef(() => AutomationConditionalIfService)) private automationConditionalIfService: AutomationConditionalIfService,
  ) {}

  async exec(block: any) {
    switch (block.type) {
      case 'outputVariable':
        return this.automationOutputVariableService.exec(block);
      case 'inputConstant':
        return this.automationInputConstantService.exec(block);
      case 'conditionalIf':
        return this.automationConditionalIfService.exec(block);
    }
  }

  async getOutputType(block: any) {
    switch (block.type) {
      case 'inputConstant':
        return this.automationInputConstantService.getOutputType(block);
      case 'conditionalIf':
        return this.automationConditionalIfService.getOutputType(block);
      case 'outputVariable':
        return this.automationOutputVariableService.getOutputType(block);
    }
  }
}
