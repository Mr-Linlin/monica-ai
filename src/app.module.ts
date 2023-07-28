import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    CommonModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
