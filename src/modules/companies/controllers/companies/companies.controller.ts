import { Body, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

import { ApiController, ApiDelete, ApiGet, ApiPatch, ApiPost, EntityByIdParam } from '@shared/decorators';
import { API_ENDPOINTS, IHttpResponse } from '@core/constants';
import { CurrentAuth } from '@authentication/decorators';
import { Company } from '@companies/entities';
import { CompaniesService } from '@companies/services';
import { CompanyCreateDto, CompanyUpdateDto } from '@companies/dto';
import { UseSessionGuard } from '@users/decorators';
import { ALL_ROLES, AuthRole } from '@authentication/constants';
import { User } from '@users/entities';
import { ValidateIdPipe } from '@core/pipes/validate-id.pipe';

@ApiController(API_ENDPOINTS.COMPANIES.BASE_PATH)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiPost({
    roles: [AuthRole.REGULAR],
    summary: 'Create a new `Company`',
    description: 'Stores a new `Company` record into the database',
    responseDescription: 'A model containing the newly created `Company` information',
    responseType: Company,
  })
  @UseSessionGuard()
  async create(@CurrentAuth() user: User, @Body() dto: CompanyCreateDto): Promise<IHttpResponse<Company>> {
    const data = await this.companiesService.create(dto, user);
    return { data };
  }

  @ApiGet({
    roles: [AuthRole.ADMIN],
    summary: 'Get all `Companies`',
    description: 'Retrieves a list containing every `Company` record in the database',
    responseDescription: 'A list of models containing the information of every `Company` in the database',
    responseType: [Company],
  })
  @UseSessionGuard()
  async find(@CurrentAuth() company: Company): Promise<IHttpResponse<Company[]>> {
    const data = await this.companiesService.find();
    return { data };
  }

  @ApiGet({
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    path: API_ENDPOINTS.COMPANIES.BY_ID,
    summary: 'Get a `Company` by Id',
    description: 'Retrieves an `Company` record that matches the Id',
    responseDescription: 'A model containing the information of the matched `Company`',
    responseType: Company,
  })
  @UseSessionGuard()
  @ApiParam({ name: 'id', type: Number })
  async findById(@CurrentAuth() user: User, @Param('id') id: number): Promise<IHttpResponse<Company>> {
    await this.companiesService.validateOwnerAndManager(user, id);
    const data = await this.companiesService.findOne({ where: { id } });
    return { data };
  }

  @ApiPatch({
    roles: [AuthRole.OWNER],
    path: API_ENDPOINTS.COMPANIES.BY_ID,
    summary: 'Update an `Company` by Id',
    description: 'Updates an `Company` record that matches the Id',
    responseDescription: 'A model containing the updated information of the matched `Company`',
    responseType: Company,
  })
  @UseSessionGuard()
  @ApiParam({ name: 'id', type: Number })
  async updateById(
    @CurrentAuth() user: User,
    @EntityByIdParam(Company) company: Company,
    @Body() body: CompanyUpdateDto,
  ): Promise<IHttpResponse<Company>> {
    const data = await this.companiesService.updateById(user, company.id, body);
    return { data };
  }

  @ApiDelete({
    roles: [AuthRole.OWNER],
    path: API_ENDPOINTS.COMPANIES.BY_ID,
    summary: 'Delete an `Company` by Id',
    description: 'Deletes an `Company` record that matches the Id',
    responseDescription: 'A model containing the information of the deleted `Company`',
    responseType: Company,
  })
  @UseSessionGuard()
  @ApiParam({ name: 'id', type: Number })
  async deleteById(
    @CurrentAuth() user: User,
    @EntityByIdParam(Company) company: Company,
  ): Promise<IHttpResponse<Company>> {
    const data = await this.companiesService.deleteById(user, company.id);
    return { data };
  }

  @ApiPost({
    roles: [AuthRole.OWNER],
    path: API_ENDPOINTS.COMPANIES.EMPOLYEE,
    summary: 'Add a `Employee` by Id',
    responseType: Company,
  })
  @UseSessionGuard()
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'user', type: Number })
  async addEmployee(
    @CurrentAuth() currentUser: User,
    @EntityByIdParam(Company) company: Company,
    @Param('user', ValidateIdPipe) user: number,
  ): Promise<IHttpResponse<Company>> {
    const data = await this.companiesService.addEmployee(currentUser, company.id, user);
    return { data };
  }

  @ApiDelete({
    roles: [AuthRole.OWNER],
    path: API_ENDPOINTS.COMPANIES.EMPOLYEE,
    summary: 'Remove a `Employee` by Id',
    responseType: Company,
  })
  @UseSessionGuard()
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'user', type: Number })
  async removeEmployee(
    @CurrentAuth() currentUser: User,
    @EntityByIdParam(Company) company: Company,
    @Param('user', ValidateIdPipe) user: number,
  ): Promise<IHttpResponse<Company>> {
    const data = await this.companiesService.removeEmployee(currentUser, company.id, user);
    return { data };
  }
}
