import { Module } from '@nestjs/common';
import { AutomationController } from './controllers/automation.controller';
import { AutomationService } from './services/automation.service';
import { AutomationCommonService } from './services/common/common.service';
import { AutomationConditionalIfService } from './services/conditionals/conditional-if.service';
import { AutomationInputConstantService } from './services/inputs/input-constant.service';
import { AutomationOutputVariableService } from './services/outputs/output-variable.service';

@Module({
  imports: [],
  controllers: [AutomationController],
  providers: [
    AutomationService,
    AutomationCommonService,
    AutomationOutputVariableService,
    AutomationInputConstantService,
    AutomationConditionalIfService
  ],
  exports: [],
})
export class AutomationModule {}
