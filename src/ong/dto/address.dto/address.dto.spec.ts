import { validate } from 'class-validator';
import { AddressDto } from './address.dto';

describe('AddressDto', () => {
  it('should validate a valid AddressDto', async () => {
    const dto = new AddressDto();
    dto.city = 'Test City';
    dto.country = 'Test Country';
    dto.state = 'Test State';
    dto.postalCode = '12345';
    dto.streetName = 'Test Street';
    dto.number = '123';

    const validationErrors = await validate(dto);
    expect(validationErrors.length).toBe(0);
  });

  it('should fail validation if required fields are missing', async () => {
    const dto = new AddressDto();
    const validationErrors = await validate(dto);

    expect(validationErrors.length).toBeGreaterThan(0);
    expect(
      validationErrors.some((err) => err.property === 'city'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'country'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'state'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'postalCode'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'streetName'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'number'),
    ).toBeTruthy();
  });

  it('should fail validation if fields are not strings', async () => {
    const dto = new AddressDto();
    dto.city = 123 as any;
    dto.country = 456 as any;
    dto.state = true as any;
    dto.postalCode = { code: '12345' } as any;
    dto.streetName = ['Street'] as any;
    dto.number = 789 as any;

    const validationErrors = await validate(dto);
    expect(validationErrors.length).toBeGreaterThan(0);
    expect(
      validationErrors.some((err) => err.property === 'city'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'country'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'state'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'postalCode'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'streetName'),
    ).toBeTruthy();
    expect(
      validationErrors.some((err) => err.property === 'number'),
    ).toBeTruthy();
  });
});
