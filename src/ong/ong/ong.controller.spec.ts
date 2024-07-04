import { Test, TestingModule } from '@nestjs/testing';
import { OngController } from './ong.controller';
import { OngService } from './ong.service';
import { CreateOngDto } from '../dto/create_ong.dto/create_ong.dto';
import { OngDto } from '../dto/ong.dto/ong.dto';

describe('OngController', () => {
  let ongController: OngController;
  let ongService: OngService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OngController],
      providers: [
        {
          provide: OngService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    ongController = module.get<OngController>(OngController);
    ongService = module.get<OngService>(OngService);
  });

  it('should be defined', () => {
    expect(ongController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new ONG', async () => {
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

      const result: OngDto = {
        id: 1,
        verified: false,
        ...createOngDto,
      };

      jest.spyOn(ongService, 'create').mockResolvedValue(result);

      expect(await ongController.create(createOngDto)).toEqual(result);
      expect(ongService.create).toHaveBeenCalledWith(createOngDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of ONGs', async () => {
      const result: OngDto[] = [
        {
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
          id: 1,
          verified: false,
        },
      ];

      jest.spyOn(ongService, 'findAll').mockResolvedValue(result);

      expect(await ongController.findAll()).toEqual(result);
      expect(ongService.findAll).toHaveBeenCalled();
    });
  });
});
