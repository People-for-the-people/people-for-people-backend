import { Module } from '@nestjs/common';
import { OngController } from './ong/ong.controller';
import { OngService } from './ong/ong.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OngEntity } from './entity/ong.entity/ong.entity';
import { AddressEntity } from './entity/address.entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OngEntity, AddressEntity])],
  controllers: [OngController],
  providers: [OngService],
})
export class OngModule {}
