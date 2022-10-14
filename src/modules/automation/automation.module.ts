import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomationController } from './controllers/automation.controller';
import { AutomationEntity } from './entities/automation.entity';
import { AutomationInputVariableEntity } from './entities/inputs/input-variable.entity';
import { AutomationOutputVariableEntity } from './entities/output/output-variable.entity';
import { AutomationService } from './services/automation.service';
import { AutomationCommonService } from './services/common/common.service';
import {
  AutomationConditionalAndService,
  AutomationConditionalIfService,
  AutomationConditionalNotService,
  AutomationConditionalOrService,
} from './services/conditionals';
import { AutomationInputConstantService } from './services/inputs';
import { AutomationInputVariableService } from './services/inputs/input-variable.service';
import {
  AutomationOperatorAddService,
  AutomationOperatorDivService,
  AutomationOperatorMulService,
  AutomationOperatorPowService,
  AutomationOperatorRootService,
  AutomationOperatorSubService,
} from './services/operators';
import { AutomationOutputVariableService } from './services/outputs';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AutomationEntity,
      AutomationOutputVariableEntity,
      AutomationInputVariableEntity
    ]),
  ],
  controllers: [AutomationController],
  providers: [
    AutomationService,
    AutomationCommonService,

    //Inputs
    AutomationInputConstantService,
    AutomationInputVariableService,

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
  ],
  exports: [],
})
export class AutomationModule {}
