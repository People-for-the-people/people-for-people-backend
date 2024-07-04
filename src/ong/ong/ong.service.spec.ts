import { Test, TestingModule } from '@nestjs/testing';
import { OngService } from './ong.service';
import { Repository } from 'typeorm';
import { OngEntity } from '../entity/ong.entity/ong.entity';
import { AddressEntity } from '../entity/address.entity/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateOngDto } from '../dto/create_ong.dto/create_ong.dto';

describe('OngService', () => {
  let service: OngService;
  let ongRepository: Repository<OngEntity>;
  let addressRepository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OngService,
        {
          provide: getRepositoryToken(OngEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OngService>(OngService);
    ongRepository = module.get<Repository<OngEntity>>(
      getRepositoryToken(OngEntity),
    );
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an ONG successfully', async () => {
    const createOngDto: CreateOngDto = {
      name: 'Test ONG',
      logoUrl: 'http://example.com/logo.png',
      nature: 'Nature',
      email: 'test@example.com',
      phoneNumber: '123456789',
      address: {
        city: 'Test City',
        country: 'Test Country',
        state: 'Test State',
        postalCode: '12345',
        streetName: 'Test Street',
        number: '123',
      },
    };

    const savedAddressEntity = {
      ...createOngDto.address,
      id: 1,
    } as AddressEntity;
    const savedOngEntity = {
      ...createOngDto,
      address: savedAddressEntity,
      id: 1,
    } as OngEntity;

    jest.spyOn(addressRepository, 'save').mockResolvedValue(savedAddressEntity);
    jest.spyOn(ongRepository, 'save').mockResolvedValue(savedOngEntity);

    const result = await service.create(createOngDto);

    expect(result).toEqual(savedOngEntity);
    expect(addressRepository.save).toHaveBeenCalledWith(
      expect.any(AddressEntity),
    );
    expect(ongRepository.save).toHaveBeenCalledWith(expect.any(OngEntity));
  });

  it('should throw an error if address saving fails', async () => {
    const createOngDto: CreateOngDto = {
      name: 'Test ONG',
      logoUrl: 'http://example.com/logo.png',
      nature: 'Nature',
      email: 'test@example.com',
      phoneNumber: '123456789',
      address: {
        city: 'Test City',
        country: 'Test Country',
        state: 'Test State',
        postalCode: '12345',
        streetName: 'Test Street',
        number: '123',
      },
    };

    jest.spyOn(addressRepository, 'save').mockRejectedValueOnce(new Error());

    await expect(service.create(createOngDto)).rejects.toThrow(
      'Erro ao criar ONG',
    );
    expect(addressRepository.save).toHaveBeenCalled();
  });

  it('should return all ONGs with addresses', async () => {
    const ongEntities: OngEntity[] = [
      {
        id: 1,
        name: 'Test ONG 1',
        logoUrl: 'http://example.com/logo1.png',
        nature: 'Nature 1',
        email: 'test1@example.com',
        phoneNumber: '1234567890',
        address: {
          id: 1,
          city: 'Test City 1',
          country: 'Test Country 1',
          state: 'Test State 1',
          postalCode: '12345',
          streetName: 'Test Street 1',
          number: '123',
        } as AddressEntity,
      } as OngEntity,
    ];

    jest.spyOn(ongRepository, 'find').mockResolvedValue(ongEntities);

    const result = await service.findAll();

    expect(result).toEqual(ongEntities);
    expect(ongRepository.find).toHaveBeenCalledWith({ relations: ['address'] });
  });
});
