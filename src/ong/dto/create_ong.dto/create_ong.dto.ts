import { IsEmail, IsString } from 'class-validator';
import { AddressDto } from '../address.dto/address.dto';

export class CreateOngDto {
  @IsString()
  name: string;

  @IsString()
  logoUrl: string;

  @IsString()
  nature: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  address: AddressDto;
}
