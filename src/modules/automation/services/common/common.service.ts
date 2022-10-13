import { Injectable, Inject, forwardRef } from '@nestjs/common';
import {
  AutomationConditionalAndService,
  AutomationConditionalIfService,
  AutomationConditionalNotService,
  AutomationConditionalOrService,
} from '../conditionals';
import { AutomationInputConstantService } from '../inputs';
import { AutomationOutputVariableService } from '../outputs';

@Injectable()
export class AutomationCommonService {
  constructor(
    //Inputs
    @Inject(forwardRef(() => AutomationInputConstantService))
    private automationInputConstantService: AutomationInputConstantService,

    //Conditionals
    @Inject(forwardRef(() => AutomationConditionalIfService))
    private automationConditionalIfService: AutomationConditionalIfService,
    @Inject(forwardRef(() => AutomationConditionalAndService))
    private automationConditionalAndService: AutomationConditionalAndService,
    @Inject(forwardRef(() => AutomationConditionalOrService))
    private automationConditionalOrService: AutomationConditionalOrService,
    @Inject(forwardRef(() => AutomationConditionalNotService))
    private automationConditionalNotService: AutomationConditionalNotService,

    //Outputs
    @Inject(forwardRef(() => AutomationOutputVariableService))
    private automationOutputVariableService: AutomationOutputVariableService,
  ) {}

  async exec(block: any) {
    switch (block.type) {
      //Inputs
      case 'inputConstant':
        return this.automationInputConstantService.exec(block);

      //Conditionals
      case 'conditionalIf':
        return this.automationConditionalIfService.exec(block);
      case 'conditionalAnd':
        return this.automationConditionalAndService.exec(block);
      case 'conditionalOr':
        return this.automationConditionalOrService.exec(block);
      case 'conditionalNot':
        return this.automationConditionalNotService.exec(block);

      //Outputs
      case 'outputVariable':
        return this.automationOutputVariableService.exec(block);
    }
  }

  async getOutputType(block: any): Promise<'boolean' | 'number' | 'date'> {
    switch (block.type) {
      //Inputs
      case 'inputConstant':
        return this.automationInputConstantService.getOutputType(block);

      //Conditionals
      case 'conditionalIf':
        return this.automationConditionalIfService.getOutputType(block);
      case 'conditionalAnd':
        return this.automationConditionalAndService.getOutputType(block);
      case 'conditionalOr':
        return this.automationConditionalOrService.getOutputType(block);
      case 'conditionalNot':
        return this.automationConditionalNotService.getOutputType(block);

      //Outputs
      case 'outputVariable':
        return this.automationOutputVariableService.getOutputType(block);
    }
  }
}
