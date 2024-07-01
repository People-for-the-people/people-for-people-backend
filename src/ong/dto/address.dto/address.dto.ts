import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  postalCode: string;

  @IsString()
  streetName: string;

  @IsString()
  number: string;
}
