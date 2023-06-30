import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TestController } from './test/test.controller';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TestModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'fiana_ai',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, TestController],
  providers: [],
})
export class AppModule { }
