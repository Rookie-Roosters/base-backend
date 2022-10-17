import { AutomationEntity } from '@automation/entities/automation.entity';
import { Injectable, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
import {
  AutomationConditionalAndService,
  AutomationConditionalIfService,
  AutomationConditionalNotService,
  AutomationConditionalOrService,
} from '../conditionals';
import {
  AutomationInputConstantService,
  AutomationInputCurrencyService,
  AutomationInputDateNowService,
  AutomationInputDateService,
} from '../inputs';
import { AutomationInputVariableService } from '../inputs/input-variable.service';
import {
  AutomationOperatorAddService,
  AutomationOperatorDivService,
  AutomationOperatorMulService,
  AutomationOperatorPowService,
  AutomationOperatorRootService,
  AutomationOperatorSubService,
} from '../operators';
import {
  AutomationOutputChartService,
  AutomationOutputNotificationService,
  AutomationOutputVariableService,
} from '../outputs';

@Injectable()
export class AutomationCommonService {
  constructor(
    //Inputs
    @Inject(forwardRef(() => AutomationInputConstantService))
    private automationInputConstantService: AutomationInputConstantService,
    @Inject(forwardRef(() => AutomationInputVariableService))
    private automationInputVariableService: AutomationInputVariableService,
    @Inject(forwardRef(() => AutomationInputDateService))
    private automationInputDateService: AutomationInputDateService,
    @Inject(forwardRef(() => AutomationInputDateNowService))
    private automationInputDateNowService: AutomationInputDateNowService,
    @Inject(forwardRef(() => AutomationInputCurrencyService))
    private automationInputCurrencyService: AutomationInputCurrencyService,

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
    @Inject(forwardRef(() => AutomationOutputChartService))
    private automationOutputChartService: AutomationOutputChartService,
    @Inject(forwardRef(() => AutomationOutputNotificationService))
    private automationOutputNotificationServie: AutomationOutputNotificationService,
  ) {}

  async exec(block: any, company: number) {
    const attributes = Object.getOwnPropertyNames(this);
    for (let attribute of attributes)
      if (this[attribute].type == block.type) return await this[attribute].exec(block, company);
    throw new ForbiddenException(`Attribute not found in common.exec`);
  }

  async save(block: any, automation: AutomationEntity) {
    const attributes = Object.getOwnPropertyNames(this);
    for (let attribute of attributes)
      if (this[attribute].type == block.type) return await this[attribute].save(block, automation);
    throw new ForbiddenException(`Attribute not found in common.save`);
  }

  async getOutputType(block: any, company: number): Promise<'boolean' | 'number' | 'date' | 'void' | 'number[]'> {
    const attributes = Object.getOwnPropertyNames(this);
    for (let attribute of attributes)
      if (this[attribute].type == block.type) return await this[attribute].getOutputType(block, company);
    throw new ForbiddenException(`Attribute not found in common.getOutputType`);
  }
}
