import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { AddressDto } from '../address.dto/address.dto';

export class OngDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  logoUrl: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsBoolean()
  verified: boolean;

  @IsString()
  nature: string;

  address: AddressDto;
}
