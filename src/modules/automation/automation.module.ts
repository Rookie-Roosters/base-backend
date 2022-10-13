import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomationController } from './controllers/automation.controller';
import { AutomationEntity } from './entities/automation.entity';
import { OutputVariableEntity } from './entities/output/output-variable.entity';
import { AutomationService } from './services/automation.service';
import { AutomationCommonService } from './services/common/common.service';
import {
  AutomationConditionalAndService,
  AutomationConditionalIfService,
  AutomationConditionalNotService,
  AutomationConditionalOrService,
} from './services/conditionals';
import { AutomationInputConstantService } from './services/inputs';
import { AutomationOutputVariableService } from './services/outputs';
@Module({
  imports: [TypeOrmModule.forFeature([AutomationEntity, OutputVariableEntity])],
  controllers: [AutomationController],
  providers: [
    AutomationService,
    AutomationCommonService,

    //Inputs
    AutomationInputConstantService,

    //Conditionals
    AutomationConditionalIfService,
    AutomationConditionalAndService,
    AutomationConditionalOrService,
    AutomationConditionalNotService,

    //Outputs
    AutomationOutputVariableService,
  ],
  exports: [],
})
export class AutomationModule {}
