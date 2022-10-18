import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import to from 'await-to-js';

import { CompanyCreateDto, CompanyUpdateDto } from '../../dto';
import { Company } from '../../entities';
import { User } from '@users/entities';
import { AuthenticationService } from '@authentication/services';
import { AuthRole } from '@authentication/constants';
import { UsersService } from '@users/services';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
  ) {}

  async create(dto: CompanyCreateDto, currentUser: User): Promise<Company> {
    if (
      !(await this.companiesRepository.findOne({
        where: {
          owner: currentUser,
        },
      }))
    ) {
      const res = await this.companiesRepository.save({
        icon: dto.icon,
        name: dto.name,
        rfc: dto.rfc,
        owner: {
          id: currentUser.id,
        },
      });
      if (res) {
        await this.authenticationService.addAuthRole(currentUser, AuthRole.OWNER);
        return res;
      } else throw new ForbiddenException('The Company was not created');
    } else throw new ForbiddenException('The user already has a Company');
  }

  async find(options?: FindManyOptions<Company>): Promise<Company[]> {
    const companies = this.companiesRepository.find(options);
    return companies;
  }

  async findOne(options: FindOneOptions<Company>): Promise<Company> {
    const company = await this.companiesRepository.findOne(options);
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async validateOwner(user: User, id: number) {
    const company = await this.companiesRepository.findOne({ where: { id }, relations: { owner: true } });
    if (user.id != company.owner.id) throw new ForbiddenException('The Current User must be the Owner');
  }

  async validateOwnerAndManager(user: User, company: number) {
    const foundCompany = await this.findOne({ where: { id: company }, relations: { owner: true } });
    const foundUser = await this.usersService.findOne({ where: { id: user.id }, relations: { company: true } });
    if (user.id != foundCompany.owner.id && foundUser.company.id != foundCompany.id)
      throw new ForbiddenException('The Current User must be the Owner or Manager');
  }

  async updateById(currentUser: User, id: number, dto: CompanyUpdateDto): Promise<Company> {
    const company = await this.companiesRepository.preload({ id, ...dto });
    if (!company) throw new NotFoundException('Company not found');
    await this.validateOwner(currentUser, id);
    await this.companiesRepository.update({ id }, dto);
    return company;
  }

  async deleteById(currentUser: User, id: number): Promise<Company> {
    const company = await this.companiesRepository.findOneBy({ id });
    if (!company) throw new NotFoundException('Company not found');
    await this.validateOwner(currentUser, id);
    return await this.companiesRepository.remove(company);
  }

  async addEmployee(currentUser: User, id: number, user: number): Promise<Company> {
    const company = await this.findOne({ where: { id } });
    await this.validateOwner(currentUser, id);
    await this.usersService.addCompany(user, company);
    await this.authenticationService.addAuthRole(
      await this.usersService.findOne({ where: { id: user } }),
      AuthRole.MANAGER,
    );
    return company;
  }

  async removeEmployee(currentUser: User, id: number, user: number): Promise<Company> {
    const company = await this.findOne({ where: { id } });
    await this.validateOwner(currentUser, id);
    await this.usersService.removeCompany(user);
    await this.authenticationService.removeAuthRole(
      await this.usersService.findOne({ where: { id: user } }),
      AuthRole.MANAGER,
    );
    return company;
  }

  async getUserCompany(user: User): Promise<Company> {
    const ownerCompany = await this.companiesRepository.findOne({
      where: {
        owner: user,
      },
    });
    if (ownerCompany) return ownerCompany;
    const foundUser = await this.usersService.findOne({ where: { id: user.id }, relations: { company: true } });
    if (foundUser.company) return foundUser.company;
    throw new ForbiddenException('The User must be part of a Company');
  }
}
