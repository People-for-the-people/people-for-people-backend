import { AddressEntity } from './address.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

describe('AddressEntity', () => {
  let repository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          entities: [AddressEntity],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([AddressEntity]),
      ],
    }).compile();

    repository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should save an address', async () => {
    const address = new AddressEntity();
    address.city = 'Test City';
    address.country = 'Test Country';
    address.state = 'Test State';
    address.postalCode = '12345';
    address.streetName = 'Test Street';
    address.number = '123';

    const savedAddress = await repository.save(address);
    expect(savedAddress.id).toBeDefined();
    expect(savedAddress.city).toBe('Test City');
    expect(savedAddress.country).toBe('Test Country');
    expect(savedAddress.state).toBe('Test State');
    expect(savedAddress.postalCode).toBe('12345');
    expect(savedAddress.streetName).toBe('Test Street');
    expect(savedAddress.number).toBe('123');
  });

  it('should find an address by id', async () => {
    const address = new AddressEntity();
    address.city = 'Test City';
    address.country = 'Test Country';
    address.state = 'Test State';
    address.postalCode = '12345';
    address.streetName = 'Test Street';
    address.number = '123';

    const savedAddress = await repository.save(address);
    const foundAddress = await repository.findOne({
      where: { id: savedAddress.id },
    });

    expect(foundAddress).toBeDefined();
    expect(foundAddress.id).toBe(savedAddress.id);
  });
});
