import { AutomationOutputNotification } from '@automation/blocks';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { forwardRef, Inject } from '@nestjs/common';
import { NotificationsGateway } from '@notifications/notifications.gateway';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

export class AutomationOutputNotificationService implements AutomationCommonClass<AutomationOutputNotification> {
  public type: string = 'outputNotification';

  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
    private notifications: NotificationsGateway,
  ) {}

  async exec(block: AutomationOutputNotification, company?: number): Promise<void> {
    const res = await this.automationCommonService.exec(block.input, company);
    //await this.notifications.send(); //We have to obtain all the users in the company
  }

  async save(block: AutomationOutputNotification, automation: AutomationEntity): Promise<void> {
    await this.automationCommonService.save(block.input, automation);
  }

  async getOutputType(block: AutomationOutputNotification, company?: number): Promise<'void'> {
    return 'void';
  }
}
