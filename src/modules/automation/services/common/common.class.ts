import { AutomationEntity } from '@automation/entities/automation.entity';

export abstract class AutomationCommonClass<C> {
  public readonly type: string;

  async exec(block: C, company?: number): Promise<unknown> {
    throw new Error('This is a abstract class');
  }

  async getOutputType(block: C, company?: number): Promise<unknown> {
    throw new Error('This is a abstract class');
  }

  async save(block: C, automation: AutomationEntity): Promise<void> {
    throw new Error('This is a abstract class');
  }
}
