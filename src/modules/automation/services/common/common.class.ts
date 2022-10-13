import { AutomationEntity } from "@automation/entities/automation.entity";

export abstract class AutomationCommonClass<C> {
  async exec(block: C): Promise<unknown> {
    throw new Error('This is a abstract class');
  }

  async getOutputType(block: C): Promise<unknown> {
    throw new Error('This is a abstract class');
  }

  async save(block: C, automation: AutomationEntity): Promise<void> {
    throw new Error('This is a abstract class');
  }
}
