import { Repository } from 'typeorm';
import { OngEntity } from './ong.entity';
import { AddressEntity } from '../address.entity/address.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

describe('OngEntity', () => {
  let ongRepository: Repository<OngEntity>;
  let addressRepository: Repository<AddressEntity>;

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
          entities: [OngEntity, AddressEntity],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([OngEntity, AddressEntity]),
      ],
    }).compile();

    ongRepository = module.get<Repository<OngEntity>>(
      getRepositoryToken(OngEntity),
    );
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(ongRepository).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should save an ONG with an address', async () => {
    const address = new AddressEntity();
    address.city = 'Test City';
    address.country = 'Test Country';
    address.state = 'Test State';
    address.postalCode = '12345';
    address.streetName = 'Test Street';
    address.number = '123';

    const savedAddress = await addressRepository.save(address);

    const ong = new OngEntity();
    ong.name = 'Test ONG';
    ong.logoUrl = 'http://test.logo.url';
    ong.verified = true;
    ong.nature = 'Test Nature';
    ong.email = 'test@ong.com';
    ong.phoneNumber = '123456789';
    ong.address = savedAddress;

    const savedOng = await ongRepository.save(ong);
    expect(savedOng.id).toBeDefined();
    expect(savedOng.name).toBe('Test ONG');
    expect(savedOng.address.id).toBe(savedAddress.id);
  });

  it('should find an ONG by id', async () => {
    const address = new AddressEntity();
    address.city = 'Test City';
    address.country = 'Test Country';
    address.state = 'Test State';
    address.postalCode = '12345';
    address.streetName = 'Test Street';
    address.number = '123';

    const savedAddress = await addressRepository.save(address);

    const ong = new OngEntity();
    ong.name = 'Test ONG';
    ong.logoUrl = 'http://test.logo.url';
    ong.verified = true;
    ong.nature = 'Test Nature';
    ong.email = 'test@ong.com';
    ong.phoneNumber = '123456789';
    ong.address = savedAddress;

    const savedOng = await ongRepository.save(ong);
    const foundOng = await ongRepository.findOne({
      where: { id: savedOng.id },
      relations: ['address'],
    });

    expect(foundOng).toBeDefined();
    expect(foundOng.id).toBe(savedOng.id);
    expect(foundOng.address.id).toBe(savedAddress.id);
  });
});
