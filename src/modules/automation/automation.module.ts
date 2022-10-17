import { CompaniesModule } from '@companies/companies.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from '@notifications/notifications.module';
import { AutomationController } from './controllers/automation.controller';
import { AutomationEntity } from './entities/automation.entity';
import { AutomationInputDateNowEntity } from './entities/inputs/input-date-now.entity';
import { AutomationInputVariableEntity } from './entities/inputs/input-variable.entity';
import {
  AutomationOutputChartActionEntity,
  AutomationOutputChartEntity,
  AutomationOutputChartValueEntity,
  AutomationOutputVariableActionEntity,
  AutomationOutputVariableEntity,
} from './entities/output';
import { AutomationService } from './services/automation.service';
import { AutomationCommonService } from './services/common/common.service';
import {
  AutomationConditionalAndService,
  AutomationConditionalIfService,
  AutomationConditionalNotService,
  AutomationConditionalOrService,
} from './services/conditionals';
import {
  AutomationInputConstantService,
  AutomationInputCurrencyService,
  AutomationInputDateNowService,
  AutomationInputDateService,
  AutomationInputVariableService,
} from './services/inputs';
import {
  AutomationOperatorAddService,
  AutomationOperatorDivService,
  AutomationOperatorMulService,
  AutomationOperatorPowService,
  AutomationOperatorRootService,
  AutomationOperatorSubService,
} from './services/operators';
import {
  AutomationOutputChartService,
  AutomationOutputNotificationService,
  AutomationOutputVariableService,
} from './services/outputs';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AutomationEntity,

      //Outputs
      AutomationOutputVariableEntity,
      AutomationOutputVariableActionEntity,
      AutomationOutputChartEntity,
      AutomationOutputChartActionEntity,
      AutomationOutputChartValueEntity,

      //Inputs
      AutomationInputVariableEntity,
      AutomationInputDateNowEntity,
    ]),
    CompaniesModule,
    NotificationsModule,
  ],
  controllers: [AutomationController],
  providers: [
    AutomationService,
    AutomationCommonService,

    //Inputs
    AutomationInputConstantService,
    AutomationInputVariableService,
    AutomationInputDateService,
    AutomationInputDateNowService,
    AutomationInputCurrencyService,

    //Conditionals
    AutomationConditionalIfService,
    AutomationConditionalAndService,
    AutomationConditionalOrService,
    AutomationConditionalNotService,

    //Operators
    AutomationOperatorAddService,
    AutomationOperatorSubService,
    AutomationOperatorMulService,
    AutomationOperatorDivService,
    AutomationOperatorPowService,
    AutomationOperatorRootService,

    //Outputs
    AutomationOutputVariableService,
    AutomationOutputChartService,
    AutomationOutputNotificationService,
  ],
  exports: [],
})
export class AutomationModule {}
