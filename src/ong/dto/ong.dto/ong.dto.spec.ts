import { validate } from 'class-validator';
import { AddressDto } from '../address.dto/address.dto';
import { OngDto } from './ong.dto';

describe('OngDto', () => {
  it('should validate a valid OngDto', async () => {
    const address: AddressDto = {
      city: 'Test City',
      country: 'Test Country',
      state: 'Test State',
      postalCode: '12345',
      streetName: 'Test Street',
      number: '123',
    };

    const dto = new OngDto();
    dto.id = 1;
    dto.name = 'Test ONG';
    dto.logoUrl = 'http://test.logo.url';
    dto.email = 'test@ong.com';
    dto.phoneNumber = '123456789';
    dto.verified = true;
    dto.nature = 'Test Nature';
    dto.address = address;

    const validationErrors = await validate(dto);
    expect(validationErrors.length).toBe(0);
  });

  it('should fail validation if required fields are missing', async () => {
    const dto = new OngDto();
    const validationErrors = await validate(dto);

    expect(validationErrors.length).toBeGreaterThan(0);
    expect(validationErrors.some((err) => err.property === 'id')).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'name'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'logoUrl'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'email'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'phoneNumber'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'verified'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'nature'),
    ).toBeTruthy();
  });

  it('should fail validation if id is not a number', async () => {
    const address: AddressDto = {
      city: 'Test City',
      country: 'Test Country',
      state: 'Test State',
      postalCode: '12345',
      streetName: 'Test Street',
      number: '123',
    };

    const dto = new OngDto();
    dto.id = 'not-a-number' as any;
    dto.name = 'Test ONG';
    dto.logoUrl = 'http://test.logo.url';
    dto.email = 'test@ong.com';
    dto.phoneNumber = '123456789';
    dto.verified = true;
    dto.nature = 'Test Nature';
    dto.address = address;

    const validationErrors = await validate(dto);
    expect(validationErrors.length).toBeGreaterThan(0);
    expect(validationErrors.some((err) => err.property === 'id')).toBeTruthy();
  });
});
