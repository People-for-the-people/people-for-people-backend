import { validate } from 'class-validator';
import { AddressDto } from '../address.dto/address.dto';
import { CreateOngDto } from './create_ong.dto';

describe('CreateOngDto', () => {
  it('should validate a valid CreateOngDto', async () => {
    const address: AddressDto = {
      city: 'Test City',
      country: 'Test Country',
      state: 'Test State',
      postalCode: '12345',
      streetName: 'Test Street',
      number: '123',
    };

    const dto = new CreateOngDto();
    dto.name = 'Test ONG';
    dto.logoUrl = 'http://test.logo.url';
    dto.nature = 'Test Nature';
    dto.email = 'test@ong.com';
    dto.phoneNumber = '123456789';
    dto.address = address;

    const validationErrors = await validate(dto);
    expect(validationErrors.length).toBe(0);
  });

  it('should fail validation if required fields are missing', async () => {
    const dto = new CreateOngDto();
    const validationErrors = await validate(dto);

    expect(validationErrors.length).toBeGreaterThan(0);
    expect(
      validationErrors.some((err) => err.property === 'name'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'logoUrl'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'nature'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'email'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'phoneNumber'),
    ).toBeTruthy();
  });

  it('should fail validation if email is invalid', async () => {
    const address: AddressDto = {
      city: 'Test City',
      country: 'Test Country',
      state: 'Test State',
      postalCode: '12345',
      streetName: 'Test Street',
      number: '123',
    };

    const dto = new CreateOngDto();
    dto.name = 'Test ONG';
    dto.logoUrl = 'http://test.logo.url';
    dto.nature = 'Test Nature';
    dto.email = 'invalid-email';
    dto.phoneNumber = '123456789';
    dto.address = address;

    const validationErrors = await validate(dto);
    expect(validationErrors.length).toBeGreaterThan(0);
    expect(
      validationErrors.some((err) => err.property === 'email'),
    ).toBeTruthy();
  });
});
