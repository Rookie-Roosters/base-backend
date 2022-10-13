import { AutomationEntity } from '@automation/entities/automation.entity';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import {
  AutomationConditionalAndService,
  AutomationConditionalIfService,
  AutomationConditionalNotService,
  AutomationConditionalOrService,
} from '../conditionals';
import { AutomationInputConstantService } from '../inputs';
import {
  AutomationOperatorAddService,
  AutomationOperatorDivService,
  AutomationOperatorMulService,
  AutomationOperatorPowService,
  AutomationOperatorRootService,
  AutomationOperatorSubService,
} from '../operators';
import { AutomationOutputVariableService } from '../outputs';

@Injectable()
export class AutomationCommonService {
  constructor(
    //Inputs
    @Inject(forwardRef(() => AutomationInputConstantService))
    private automationInputConstantService: AutomationInputConstantService,

    //Operators
    @Inject(forwardRef(() => AutomationOperatorAddService))
    private automationOperatorAddService: AutomationOperatorAddService,
    @Inject(forwardRef(() => AutomationOperatorSubService))
    private automationOperatorSubService: AutomationOperatorSubService,
    @Inject(forwardRef(() => AutomationOperatorMulService))
    private automationOperatorMulService: AutomationOperatorMulService,
    @Inject(forwardRef(() => AutomationOperatorDivService))
    private automationOperatorDivService: AutomationOperatorDivService,
    @Inject(forwardRef(() => AutomationOperatorPowService))
    private automationOperatorPowService: AutomationOperatorPowService,
    @Inject(forwardRef(() => AutomationOperatorRootService))
    private automationOperatorRootService: AutomationOperatorRootService,

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

      //Operators
      case 'operatorAdd':
        return this.automationOperatorAddService.exec(block);
      case 'operatorSub':
        return this.automationOperatorSubService.exec(block);
      case 'operatorMul':
        return this.automationOperatorMulService.exec(block);
      case 'operatorDiv':
        return this.automationOperatorDivService.exec(block);
      case 'operatorPow':
        return this.automationOperatorPowService.exec(block);
      case 'operatorRoot':
        return this.automationOperatorRootService.exec(block);

      //Outputs
      case 'outputVariable':
        return this.automationOutputVariableService.exec(block);
    }
  }

  async save(block: any, automation: AutomationEntity) {
    switch (block.type) {
      //Inputs
      case 'inputConstant':
        return await this.automationInputConstantService.save(block, automation);

      //Conditionals
      case 'conditionalIf':
        return await this.automationConditionalIfService.save(block, automation);
      case 'conditionalAnd':
        return await this.automationConditionalAndService.save(block, automation);
      case 'conditionalOr':
        return await this.automationConditionalOrService.save(block, automation);
      case 'conditionalNot':
        return await this.automationConditionalNotService.save(block, automation);

      //Operators
      case 'operatorAdd':
        return await this.automationOperatorAddService.save(block, automation);
      case 'operatorSub':
        return await this.automationOperatorSubService.save(block, automation);
      case 'operatorMul':
        return await this.automationOperatorMulService.save(block, automation);
      case 'operatorDiv':
        return await this.automationOperatorDivService.save(block, automation);
      case 'operatorPow':
        return await this.automationOperatorPowService.save(block, automation);
      case 'operatorRoot':
        return await this.automationOperatorRootService.save(block, automation);

      //Outputs
      case 'outputVariable':
        return await this.automationOutputVariableService.save(block, automation);
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

      //Operators
      case 'operatorAdd':
        return this.automationOperatorAddService.getOutputType(block);
      case 'operatorSub':
        return this.automationOperatorSubService.getOutputType(block);
      case 'operatorMul':
        return this.automationOperatorMulService.getOutputType(block);
      case 'operatorDiv':
        return this.automationOperatorDivService.getOutputType(block);
      case 'operatorPow':
        return this.automationOperatorPowService.getOutputType(block);
      case 'operatorRoot':
        return this.automationOperatorRootService.getOutputType(block);

      //Outputs
      case 'outputVariable':
        return this.automationOutputVariableService.getOutputType(block);
    }
  }
}
