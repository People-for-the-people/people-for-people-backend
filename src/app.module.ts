import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OngModule } from './ong/ong.module';

@Module({
  imports: [OngModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
