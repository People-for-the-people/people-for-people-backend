import { Body, Controller, Get, Post } from '@nestjs/common';
import { OngService } from './ong.service';
import { OngDto } from '../dto/ong.dto/ong.dto';

@Controller('ong')
export class OngController {
  constructor(private ongService: OngService) {}
  @Post()
  create(@Body() ong: OngDto): OngDto {
    return this.ongService.create(ong);
  }

  @Get()
  findAll(): OngDto[] {
    return this.ongService.findAll();
  }
}
