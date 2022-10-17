import { AutomationOutputNotification } from "@automation/blocks";
import { AutomationEntity } from "@automation/entities/automation.entity";
import { AutomationCommonClass } from "../common/common.class";

export class AutomationOutputNotificationService implements AutomationCommonClass<AutomationOutputNotification> {
    public type: string = 'outputNotification';

    async exec(block: AutomationOutputNotification, company?: number): Promise<void> {
        
    }

    async save(block: AutomationOutputNotification, automation: AutomationEntity): Promise<void> {
        
    }

    async getOutputType(block: AutomationOutputNotification, company?: number): Promise<'void'> {
        return 'void';
    }
}