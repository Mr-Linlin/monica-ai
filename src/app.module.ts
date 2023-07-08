import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
    UsersModule,
    ChatModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
