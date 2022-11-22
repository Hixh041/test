import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';

let DBConfig;
if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'local') {
  DBConfig =  {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'sqlite',
      database: config.get<string>('DB_NAME'),
      entities: [Task],
      synchronize: true,
    })
  }
} else {
  DBConfig = {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'mysql',
      host: process.env.DOCKER === 'true' ? 'mydb' : 'localhost', 
      port: +config.get<string>('DB_PORT'), 
      username: config.get<string>('MYSQL_USER'),
      password: config.get<string>('MYSQL_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      entities: [Task],
      synchronize: true,
    })
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TasksModule,
    TypeOrmModule.forRootAsync(DBConfig),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // validator
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    }
  ],
})
export class AppModule {}
