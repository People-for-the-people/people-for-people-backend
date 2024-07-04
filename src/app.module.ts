import { Module } from '@nestjs/common';
import { OngModule } from './ong/ong.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['**/entity/*.entity.ts'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    OngModule,
  ],
})
export class AppModule {}
