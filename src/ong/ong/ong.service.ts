import { Injectable } from '@nestjs/common';
import { OngDto } from '../dto/ong.dto/ong.dto';

@Injectable()
export class OngService {
  ongs: OngDto[] = [];

  create(ong: OngDto): OngDto {
    this.ongs.push(ong);
    return ong;
  }

  findAll(): OngDto[] {
    return this.ongs;
  }
}
