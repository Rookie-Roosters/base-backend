import { Body, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

import { ApiController, ApiDelete, ApiGet, ApiPatch, ApiPost, EntityByIdParam } from '@shared/decorators';
import { API_ENDPOINTS, IHttpResponse } from '@core/constants';
import { CurrentAuth } from '@authentication/decorators';
import { Company } from '@companies/entities';
import { CompaniesService } from '@companies/services';
import { CompanyCreateDto, CompanyUpdateDto } from '@companies/dto';
import { UseSessionGuard } from '@users/decorators';

@ApiController(API_ENDPOINTS.COMPANIES.BASE_PATH)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiPost({
    summary: 'Create a new `Company`',
    description: 'Stores a new `Company` record into the database',
    responseDescription: 'A model containing the newly created `Company` information',
    responseType: Company,
  })
  async create(@Body() dto: CompanyCreateDto): Promise<IHttpResponse<Company>> {
    const data = await this.companiesService.create(dto);
    return { data };
  }

  @ApiGet({
    summary: 'Get all `Companies`',
    description: 'Retrieves a list containing every `Company` record in the database',
    responseDescription: 'A list of models containing the information of every `Company` in the database',
    responseType: [Company],
  })
  @UseSessionGuard()
  async find(@CurrentAuth() company: Company): Promise<IHttpResponse<Company[]>> {
    console.log(company);
    const data = await this.companiesService.find();
    return { data };
  }

  @ApiGet({
    path: API_ENDPOINTS.COMPANIES.BY_ID,
    summary: 'Get a `Company` by Id',
    description: 'Retrieves an `Company` record that matches the Id',
    responseDescription: 'A model containing the information of the matched `Company`',
    responseType: Company,
  })
  @ApiParam({ name: 'id', type: Number })
  async findById(@Param('id') id: number): Promise<IHttpResponse<Company>> {
    const data = await this.companiesService.findOne({ where: { id } });
    return { data };
  }

  @ApiPatch({
    path: API_ENDPOINTS.COMPANIES.BY_ID,
    summary: 'Update an `Company` by Id',
    description: 'Updates an `Company` record that matches the Id',
    responseDescription: 'A model containing the updated information of the matched `Company`',
    responseType: Company,
  })
  @ApiParam({ name: 'id', type: Number })
  async updateById(
    @EntityByIdParam(Company) company: Company,
    @Body() body: CompanyUpdateDto,
  ): Promise<IHttpResponse<Company>> {
    const data = await this.companiesService.updateById(company.id, body);
    return { data };
  }

  @ApiDelete({
    path: API_ENDPOINTS.COMPANIES.BY_ID,
    summary: 'Delete an `Company` by Id',
    description: 'Deletes an `Company` record that matches the Id',
    responseDescription: 'A model containing the information of the deleted `Company`',
    responseType: Company,
  })
  @ApiParam({ name: 'id', type: Number })
  async deleteById(@EntityByIdParam(Company) company: Company): Promise<IHttpResponse<Company>> {
    const data = await this.companiesService.deleteById(company.id);
    return { data };
  }
}
