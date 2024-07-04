import { Injectable } from '@nestjs/common';
import { OngDto } from '../dto/ong.dto/ong.dto';
import { CreateOngDto } from '../dto/create_ong.dto/create_ong.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OngEntity } from '../entity/ong.entity/ong.entity';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entity/address.entity/address.entity';
import { AddressDto } from '../dto/address.dto/address.dto';

@Injectable()
export class OngService {
  constructor(
    @InjectRepository(OngEntity) private ongRepository: Repository<OngEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async create(ong: CreateOngDto): Promise<OngDto> {
    try {
      const addressEntity = await this.saveOngAddress(ong.address);

      let ongEntity = new OngEntity();
      Object.assign(ongEntity, {
        name: ong.name,
        logoUrl: ong.logoUrl,
        nature: ong.nature,
        email: ong.email,
        phoneNumber: ong.phoneNumber,
        address: addressEntity,
      });
      ongEntity = await this.ongRepository.save(ongEntity);

      return ongEntity;
    } catch {
      throw new Error('Erro ao criar ONG');
    }
  }

  private async saveOngAddress(address: AddressDto): Promise<AddressEntity> {
    try {
      let addressEntity = new AddressEntity();
      Object.assign(addressEntity, address);
      addressEntity = await this.addressRepository.save(addressEntity);
      return addressEntity;
    } catch {
      throw new Error();
    }
  }

  async findAll(): Promise<OngDto[]> {
    return await this.ongRepository.find({ relations: ['address'] });
  }
}
