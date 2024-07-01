import { IsString } from 'class-validator';
import { AddressDto } from '../address.dto/address.dto';

export class OngDto {
  @IsString()
  name: string;

  @IsString()
  logoUrl: string;

  @IsString()
  nature: string;

  address: AddressDto;
}
