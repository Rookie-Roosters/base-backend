import { BankRepository } from '@banking/constants';
import {
  AccountsGetResponseDto,
  AuthenticationParamsDto,
  AuthenticationResponseDto,
  MovementsGetParamsDto,
  MovementsGetResponseDto,
  RecipientsGetParamsDto,
  RecipientsGetResponseDto,
  TransferDoParamsDto,
  TransferDoResponseDto,
} from '@banking/dto';
import { BaseBankService } from '@banking/implementations';
import { BankCredentials } from '@companies/entities';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities';
import { DeleteResult, Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class BankingService {
  readonly TEN_MINUTES = 10 * 60 * 1000;

  constructor(
    @InjectRepository(BankCredentials) private bankCredentialsRepository: Repository<BankCredentials>,
    private readonly baseBankService: BaseBankService,
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,
  ) {}

  private bankService(bankName: string): BankRepository {
    switch (bankName) {
      case this.baseBankService.name:
        return this.baseBankService;
      default:
        throw new ForbiddenException('Invalid bank name');
    }
  }

  async expired(user: User, id: number): Promise<boolean> {
    const company = await this.companiesService.getUserCompany(user);
    const bankCredentials = await this.bankCredentialsRepository.findOne({ where: { id, company } });
    if (bankCredentials) {
      return bankCredentials.exipired;
    } else throw new ForbiddenException('Bank not found');
  }

  private async getCredentials(
    user: User,
    id: number,
  ): Promise<{ bank: string; credentials: AuthenticationParamsDto; jwt: string }> {
    const company = await this.companiesService.getUserCompany(user);
    const bankCredentials = await this.bankCredentialsRepository.findOne({ where: { id, company } });
    if (bankCredentials) {
      if (!bankCredentials.exipired) {
        return {
          bank: bankCredentials.bankName,
          credentials: this.jwtService.decode(bankCredentials.credentials) as AuthenticationParamsDto,
          jwt: bankCredentials.jwt,
        };
      } else throw new ForbiddenException('jwt expired');
    } else throw new ForbiddenException('Bank not found');
  }

  async create(user: User, bank: string, params: AuthenticationParamsDto): Promise<AuthenticationResponseDto> {
    const company = await this.companiesService.getUserCompany(user);
    const createdBank = await this.bankCredentialsRepository.save({
      bankName: bank,
      company,
      credentials: '',
      exipired: true,
      jwt: '',
      jwtRefresh: '',
    });
    if (createdBank) {
      return await this.signIn(user, createdBank.id, params);
    } else throw new ForbiddenException('Banking not created');
  }

  async signIn(user: User, id: number, params: AuthenticationParamsDto): Promise<AuthenticationResponseDto> {
    const company = await this.companiesService.getUserCompany(user);
    const bankCredentials = await this.bankCredentialsRepository.findOne({ where: { id, company } });
    if (bankCredentials) {
      const authentication = await this.bankService(bankCredentials.bankName).signIn(params);
      if (authentication.jwt) {
        const credentials = this.jwtService.sign(params);
        bankCredentials.jwt = authentication.jwt;
        bankCredentials.jwtRefresh = authentication.jwtRefresh;
        bankCredentials.credentials = credentials;
        bankCredentials.exipired = false;
        await this.bankCredentialsRepository.save(bankCredentials);
        setTimeout(async () => {
          bankCredentials.exipired = true;
          await this.bankCredentialsRepository.save(bankCredentials);
          await this.bankService(bankCredentials.bankName).signOut(params, bankCredentials.jwt);
        }, this.TEN_MINUTES);
        return authentication;
      } else throw new ForbiddenException('Not sign in');
    } else throw new ForbiddenException('Bank not found');

    // const company = await this.companiesService.getUserCompany(user);
    // const bankCredentials = await this.bankCredentialsRepository.findOne({ where: { id, company } });
    // if (bankCredentials) {
    //   // const authentication = await this.bankService(bankCredentials.bankName).signIn(params);
    //   // if (authentication.jwt) {
    //   const credentials = this.jwtService.sign(params);
    //   bankCredentials.jwt = 'dflasjf';
    //   bankCredentials.jwtRefresh = 'lfdasjflkd';
    //   bankCredentials.credentials = credentials;
    //   bankCredentials.exipired = false;
    //   await this.bankCredentialsRepository.save(bankCredentials);
    //   setTimeout(async () => {
    //     bankCredentials.exipired = true;
    //     await this.bankCredentialsRepository.save(bankCredentials);
    //     // await this.bankService(bankCredentials.bankName).signOut(params, bankCredentials.jwt);
    //   }, this.TEN_MINUTES);
    //   return null;
    //   // } else throw new ForbiddenException();
    // } else throw new ForbiddenException('Bank not found');
  }

  async doTransfer(user: User, id: number, transferDoParamsDto: TransferDoParamsDto): Promise<TransferDoResponseDto> {
    const credentials = await this.getCredentials(user, id);
    return await this.bankService(credentials.bank).doTransfer(transferDoParamsDto, credentials.jwt);
  }

  async getAccounts(user: User, id: number): Promise<AccountsGetResponseDto[]> {
    const credentials = await this.getCredentials(user, id);
    return await this.bankService(credentials.bank).getAccounts(credentials.jwt);
  }

  async getMovements(user: User, id: number, params: MovementsGetParamsDto): Promise<MovementsGetResponseDto[]> {
    const credentials = await this.getCredentials(user, id);
    return await this.bankService(credentials.bank).getMovements(params, credentials.jwt);
  }

  async getRecipients(user: User, id: number, params: RecipientsGetParamsDto): Promise<RecipientsGetResponseDto[]> {
    const credentials = await this.getCredentials(user, id);
    return await this.bankService(credentials.bank).getRecipients(params, credentials.jwt);
  }

  async remove(user: User, id: number): Promise<DeleteResult> {
    const company = await this.companiesService.getUserCompany(user);
    const bankCredentials = await this.bankCredentialsRepository.findOne({ where: { id, company } });
    if (bankCredentials) {
      return await this.bankCredentialsRepository.delete(bankCredentials.id);
    } else throw new ForbiddenException('Bank must exit');
  }

  async findAll(user: User) : Promise<{bankName: string, id: number}[]> {
    const company = await this.companiesService.getUserCompany(user);
    const banks = await this.bankCredentialsRepository.find({
      where: {
        company,
      }
    })
    return banks.map((bank) => {
      return {
        bankName: bank.bankName,
        id: bank.id
      };
    });
  }
}
