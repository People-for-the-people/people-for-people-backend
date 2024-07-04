import { Body, Controller, Get, Post } from '@nestjs/common';
import { OngService } from './ong.service';
import { OngDto } from '../dto/ong.dto/ong.dto';
import { CreateOngDto } from '../dto/create_ong.dto/create_ong.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ONG')
@Controller('ong')
export class OngController {
  constructor(private ongService: OngService) {}
  @Post()
  create(@Body() ong: CreateOngDto): Promise<OngDto> {
    return this.ongService.create(ong);
  }

  @Get()
  findAll(): Promise<OngDto[]> {
    return this.ongService.findAll();
  }
}
