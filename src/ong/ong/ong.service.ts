import { Injectable } from '@nestjs/common';
import { OngDto } from '../dto/ong.dto/ong.dto';
import { CreateOngDto } from '../dto/create_ong.dto/create_ong.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OngEntity } from '../entity/ong.entity/ong.entity';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entity/address.entity/address.entity';

@Injectable()
export class OngService {
  constructor(
    @InjectRepository(OngEntity) private ongRepository: Repository<OngEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async create(ong: CreateOngDto): Promise<OngDto> {
    let ongEntity = new OngEntity();
    let addressEntity = new AddressEntity();

    addressEntity.city = ong.address.city;
    addressEntity.country = ong.address.country;
    addressEntity.state = ong.address.state;
    addressEntity.postalCode = ong.address.postalCode;
    addressEntity.streetName = ong.address.streetName;
    addressEntity.number = ong.address.number;

    addressEntity = await this.addressRepository.save(addressEntity);

    ongEntity.name = ong.name;
    ongEntity.logoUrl = ong.logoUrl;
    ongEntity.nature = ong.nature;
    ongEntity.email = ong.email;
    ongEntity.phoneNumber = ong.phoneNumber;
    ongEntity.address = addressEntity;

    ongEntity = await this.ongRepository.save(ongEntity);

    return ongEntity;
  }

  async findAll(): Promise<OngDto[]> {
    return await this.ongRepository.find({ relations: ['address'] });
  }
}
