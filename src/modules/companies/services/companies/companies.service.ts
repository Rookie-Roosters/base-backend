import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import to from 'await-to-js';

import { CompanyCreateDto, CompanyUpdateDto } from '../../dto';
import { Company } from '../../entities';
import { User } from '@users/entities';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async create(dto: CompanyCreateDto): Promise<Company> {
    const company = this.companiesRepository.create(dto);
    const [err] = await to(this.companiesRepository.save(company));
    if (err) throw new ForbiddenException(err.name, err.message);
    return company;
  }

  async find(options?: FindManyOptions<Company>): Promise<Company[]> {
    const companies = this.companiesRepository.find(options);
    return companies;
  }

  async findOne(options: FindOneOptions<Company>): Promise<Company> {
    const company = this.companiesRepository.findOne(options);
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async updateById(id: number, dto: CompanyUpdateDto): Promise<Company> {
    const company = await this.companiesRepository.preload({ id, ...dto });
    if (!company) throw new NotFoundException('Company not found');
    await this.companiesRepository.update({ id }, dto);
    return company;
  }

  async deleteById(id: number): Promise<Company> {
    const company = await this.companiesRepository.findOneBy({ id });
    if (!company) throw new NotFoundException('Company not found');
    return await this.companiesRepository.remove(company);
  }

  async getUserCompany(user: User): Promise<Company> {
    // const company = await this.companiesRepository.findOne({
    //   where: {
    //     branches: {
    //     }
    //   }
    // })
    throw new Error('Method not implemented.');
  }
}
