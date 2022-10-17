import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class MovementsGetResponseDto {
  @ApiProperty({ description: "The folio's ID" })
  @IsNumber()
  idFolio: 0;
  @ApiProperty({ description: "The movement's concept" })
  @IsString()
  concept: string;
  @ApiProperty({ description: "The ID of the client's account" })
  @IsString()
  idAccount: string;
  @ApiProperty({ description: "The client's ID" })
  @IsNumber()
  idClient: 0;
  @ApiProperty({ description: "The business unit's ID" })
  @IsNumber()
  idBusinessUnit: 0;
  @ApiProperty({ description: 'Cargo' })
  @IsBoolean()
  isCargo: true;
  @ApiProperty({ description: "The movement's date" })
  @IsDateString()
  date: '2022-08-24T14:54:05.491Z';
  @ApiProperty({ description: "The movement's amount" })
  @IsNumber()
  amount: 0;
  @ApiProperty({ description: "The account's balance" })
  @IsNumber()
  balance: 0;
  @ApiProperty({ description: "The movement's type" })
  @IsNumber()
  movementType: 0;
  @ApiProperty({ description: "The status's ID" })
  @IsNumber()
  idStatus: 0;
  @ApiProperty({ description: 'The deferred deposit' })
  @IsString()
  deferredDeposit: string;
  @ApiProperty({ description: "The movement's notes" })
  @IsString()
  notes: string;
  @ApiProperty({ description: "The bank's name" })
  @IsString()
  bankName: string;
  @ApiProperty({ description: "The movement's short currency" })
  @IsString()
  shortCurrency: string;
  @ApiProperty({ description: "The sender's name" })
  @IsString()
  senderName: string;
  @ApiProperty({ description: "The movement's folio signature" })
  @IsNumber()
  folioSignature: 0;
  movementDetail: MovementDetailDto;
}

export class MovementDetailDto {
  @ApiProperty({ description: "The movement folio's IS" })
  @IsNumber()
  idFolio: 0;
  @ApiProperty({ description: "The movement's account" })
  @IsString()
  account: string;
  @ApiProperty({ description: "The movement's capture date" })
  @IsDateString()
  dateCapture: '2022-08-24T14:54:05.491Z';
  @ApiProperty({ description: "The movement's name" })
  @IsString()
  name: string;
  @ApiProperty({ description: "The OPI's detail charge" })
  @IsString()
  opiDetailCharge: string;
  @ApiProperty({ description: "The OPI's shipping reference" })
  @IsString()
  opiShippingReference: string;
  @ApiProperty({ description: "The OPI's ordering reference" })
  @IsString()
  opiOrderingReference: string;
  @ApiProperty({ description: "The OPI's position reciever" })
  @IsString()
  opiPositionReceiver: string;
  @ApiProperty({ description: "The OPN's key operation" })
  @IsNumber()
  opnKeyOperation: 0;
  @ApiProperty({ description: "The OPN's payment concept" })
  @IsString()
  opnPaymentConcept: string;
  @ApiProperty({ description: "The OPN's settlement date" })
  @IsDateString()
  opnSettlementDate: '2022-08-24T14:54:05.491Z';
  @ApiProperty({ description: "The OPN's reference shipping" })
  @IsString()
  opnReferenceShipping: string;
  @ApiProperty({ description: "The SPEI's tracking day" })
  @IsString()
  speiTrackingKey: string;
  @ApiProperty({ description: "The SPEI's payment concept" })
  @IsString()
  speiPaymentConcept: string;
  @ApiProperty({ description: "The SPEI's payment type's description" })
  @IsString()
  speiDescriptionPaymentType: string;
  @ApiProperty({ description: "The SPEI's payment type's ID" })
  @IsNumber()
  speiIdPaymentType: 0;
  @ApiProperty({ description: "The SPEI's RFC" })
  @IsString()
  speiRfc: string;
  @ApiProperty({ description: "The tax's reciept" })
  @IsNumber()
  taxReceipt: 0;
  @ApiProperty({ description: "The SPEI's numeric reference" })
  @IsString()
  speiNumericReference: string;
  @ApiProperty({ description: "The NUBA's reference" })
  @IsString()
  nubaReference: string;
  @ApiProperty({ description: "The payment's name service" })
  @IsString()
  paymentNameService: string;
  @ApiProperty({ description: "The payment's payment reference" })
  @IsString()
  paymentReference: string;
  @ApiProperty({ description: "The movement's RFC" })
  @IsString()
  rfc: string;
  @ApiProperty({ description: "The payment's type" })
  @IsString()
  paymentType: string;
  @ApiProperty({ description: "The movement's counterpart" })
  @IsString()
  counterpart: string;
  @ApiProperty({ description: "The movement's additional information" })
  @IsString()
  aditionalInformation: string;
  @ApiProperty({ description: "The bank's beneficiary name" })
  @IsString()
  bankBeneficiaryName: string;
  @ApiProperty({ description: "The movement's extended concept" })
  @IsString()
  extendedConcept: string;
  @ApiProperty({ description: "The movement's FX operation" })
  @IsString()
  fxOperation: string;
  @ApiProperty({ description: 'The delivered FX' })
  @IsNumber()
  fxDelivered: 0;
  @ApiProperty({ description: 'The delivered FX currency' })
  @IsString()
  fxCurrencyDelivered: string;
  @ApiProperty({ description: "The FX's operation type" })
  @IsString()
  fxOperationType: string;
  @ApiProperty({ description: "The FX date's operation" })
  @IsDateString()
  fxDateOperation: '2022-08-24T14:54:05.491Z';
  @ApiProperty({ description: "The FX's reciept" })
  @IsNumber()
  fxReceipt: 0;
  @ApiProperty({ description: "The FX's currency reciept" })
  @IsString()
  fxCurrencyReceipt: string;
  @ApiProperty({ description: "The FX's exchange rate" })
  @IsNumber()
  fxExchangeRate: 0;
  @ApiProperty({ description: "The FX date's value" })
  @IsDateString()
  fxDateValue: '2022-08-24T14:54:05.491Z';
  @ApiProperty({ description: "The commision's description" })
  @IsString()
  commissionDescription: string;
  @ApiProperty({ description: "The commision's quantity" })
  @IsString()
  commissionQuantity: string;
  @ApiProperty({ description: "The commision's CU" })
  @IsString()
  commissionCU: string;
  @ApiProperty({ description: "The commision's discount" })
  @IsString()
  commissionDiscount: string;
}
