import { Module } from "@nestjs/common";
import { AutomationService } from "./services/automation.service";

@Module({
    imports: [],
    controllers: [],
    providers: [AutomationService],
    exports: [],
})
export class AutomationModule {}