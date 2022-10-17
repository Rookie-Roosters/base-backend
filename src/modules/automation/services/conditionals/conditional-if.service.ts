import { AutomationConditionalIf } from '@automation/blocks/conditionals/conditional-if';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { Injectable, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
import { AutomationCommonClass } from '../common/common.class';
import { AutomationCommonService } from '../common/common.service';

@Injectable()
export class AutomationConditionalIfService implements AutomationCommonClass<AutomationConditionalIf> {
  constructor(
    @Inject(forwardRef(() => AutomationCommonService)) private automationCommonService: AutomationCommonService,
  ) {}

  public type: string = 'conditionalIf';

  async exec(block: AutomationConditionalIf, company?: number): Promise<boolean> {
    const input1Type = await this.automationCommonService.getOutputType(block.input1, company);
    const input2Type = await this.automationCommonService.getOutputType(block.input2, company);
    if ((input1Type == 'number' || input1Type == 'date') && (input2Type == 'number' || input2Type == 'date')) {
      if (input1Type == input2Type) {
        if (input1Type == 'date' && input2Type == 'date') {
          if (block.operator == '=') {
            const value1 = (await this.automationCommonService.exec(block.input1, company)) as Date;
            const value2 = (await this.automationCommonService.exec(block.input2, company)) as Date;
            if (
              value1.getDate() == value2.getDate() &&
              value1.getMonth() == value2.getMonth() &&
              value1.getFullYear() == value2.getFullYear()
            )
              return true;
            else return false;
          } else throw new ForbiddenException("if operator must be '='");
        } else {
          const value1 = await this.automationCommonService.exec(block.input1, company);
          const value2 = await this.automationCommonService.exec(block.input2, company);
          switch (block.operator) {
            case '=':
              return value1 == value2;
            case '!=':
              return value1 != value2;
            case '<':
              return value1 < value2;
            case '>':
              return value1 > value2;
            case '<=':
              return value1 <= value2;
            case '>=':
              return value2 >= value2;
            default:
              throw new ForbiddenException('if operator must be valid');
          }
        }
      } else throw new ForbiddenException('if parameters types must be equal');
    } else throw new ForbiddenException('if parameters types must be boolean or number');
  }

  async save(block: AutomationConditionalIf, automation: AutomationEntity): Promise<void> {
    const input1Type = await this.automationCommonService.getOutputType(block.input1, automation.company.id);
    const input2Type = await this.automationCommonService.getOutputType(block.input2, automation.company.id);
    if ((input1Type == 'number' || input1Type == 'date') && (input2Type == 'number' || input2Type == 'date')) {
      if (input1Type == input2Type) {
        if (input1Type == 'date' && input2Type == 'date') {
          if (block.operator == '=') {
            await this.automationCommonService.save(block.input1, automation);
            await this.automationCommonService.save(block.input2, automation);
          } else throw new ForbiddenException("if operator must be '='");
        } else {
          if (
            block.operator == '=' ||
            block.operator == '!=' ||
            block.operator == '<' ||
            block.operator == '>' ||
            block.operator == '<=' ||
            block.operator == '>='
          ) {
            await this.automationCommonService.save(block.input1, automation);
            await this.automationCommonService.save(block.input2, automation);
          } else throw new ForbiddenException("If operator must be '=', '!=', '<', '>', '<=' or '>='");
        }
      } else throw new ForbiddenException('if parameters types must be equal');
    } else throw new ForbiddenException('if parameters types must be boolean or number');
  }

  async getOutputType(block: AutomationConditionalIf, company?: number): Promise<'boolean'> {
    return 'boolean';
  }
}
