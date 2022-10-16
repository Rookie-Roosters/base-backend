import { Automation } from '@automation/blocks/automation';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AutomationCommonService } from './common/common.service';
import * as fs from 'fs';
import { STORAGE_PATHS } from '@core/constants/storage_paths.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { AutomationEntity } from '@automation/entities/automation.entity';
import { DeleteResult, Repository } from 'typeorm';
import { AutomationResponseDto } from '@automation/dtos/automation-response.dto';

@Injectable()
export class AutomationService {
  constructor(
    @InjectRepository(AutomationEntity) private automationRepository: Repository<AutomationEntity>,
    private automationCommonService: AutomationCommonService,
  ) {}

  private async exec(block: any, company?: number) {
    return await this.automationCommonService.exec(block, company);
  }

  private async save(block: any, automation: AutomationEntity) {
    await this.automationCommonService.save(block, automation);
  }

  private async findRawOne(company: number, id: number) {
    //Validate if the company exists
    const automation = await this.automationRepository.findOne({
      where: {
        id,
        company,
      },
    });
    if (automation) return automation;
    else throw new ForbiddenException('Automation must exists');
  }

  private deleteFile(filename: string) {
    const path = `${STORAGE_PATHS.AUTOMATION}/${filename}.json`;
    if (fs.existsSync(path)) fs.unlinkSync(path);
  }

  private createFile(filename: string, automation: Automation) {
    this.deleteFile(filename);
    const json = JSON.stringify(automation);
    fs.writeFileSync(`${STORAGE_PATHS.AUTOMATION}/${filename}.json`, json, 'utf-8');
  }

  async execute(company: number, id: number): Promise<any> {
    const automation = await this.findOne(company, id);
    if (!automation.draft) return await this.exec(automation.automation.output, company);
    else throw new ForbiddenException('The Automation must not be a draft');
  }

  async rawExecute(automation: Automation) {
    return await this.exec(automation.output);
  }

  async saveDraft(automation: Automation, company: number): Promise<AutomationResponseDto> {
    const filename = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    this.createFile(filename, automation);
    const createdAutomation = await this.automationRepository.save({
      filename,
      company,
      draft: true,
    });
    return {
      id: createdAutomation.id!,
      company,
      automation,
      draft: createdAutomation.draft,
    };
  }

  async create(automation: Automation, company: number): Promise<AutomationResponseDto> {
    //Check if a company exists
    const filename = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    this.createFile(filename, automation);
    const createdAutomation = await this.automationRepository.save({
      filename,
      company,
    });
    try {
      await this.save(automation.output, createdAutomation);
      return {
        id: createdAutomation.id!,
        company,
        automation,
        draft: createdAutomation.draft,
      };
    } catch (ex) {
      await this.delete(company, createdAutomation.id);
      throw new ForbiddenException(ex);
    }
  }

  async findAll(company: number): Promise<AutomationResponseDto[]> {
    //Validate if the company exists
    const automations = await this.automationRepository.find({
      where: {
        company,
      },
    });
    return await Promise.all(
      automations.map(async (automation) => {
        //Validate if the file exits
        const json = fs.readFileSync(`${STORAGE_PATHS.AUTOMATION}/${automation.filename}.json`);
        const automationFile = JSON.parse(json as unknown as string);
        return {
          id: automation.id,
          company,
          automation: automationFile,
          draft: automation.draft,
        };
      }),
    );
  }

  async findOne(company: number, id: number): Promise<AutomationResponseDto> {
    //Validate if the company exits
    const automation = await this.automationRepository.findOne({
      where: {
        id,
        company,
      },
    });
    if (automation) {
      //Validate if the file exits
      const json = fs.readFileSync(`${STORAGE_PATHS.AUTOMATION}/${automation.filename}.json`);
      const automationFile = JSON.parse(json as unknown as string);
      return {
        id: automation.id,
        company,
        automation: automationFile,
        draft: automation.draft,
      };
    } else throw new ForbiddenException('Automation must exists');
  }

  async updateAutomation(company: number, id: number, automation: Automation): Promise<AutomationResponseDto> {
    await this.delete(company, id);
    return this.create(automation, company);
  }

  async delete(company: number, id: number): Promise<DeleteResult> {
    const automation = await this.findRawOne(company, id);
    this.deleteFile(automation.filename);
    return await this.automationRepository.delete(id);
  }
}
