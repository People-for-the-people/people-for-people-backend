import { Module } from '@nestjs/common';
import { OngController } from './ong/ong.controller';
import { OngService } from './ong/ong.service';

@Module({
  controllers: [OngController],
  providers: [OngService],
})
export class OngModule {}
