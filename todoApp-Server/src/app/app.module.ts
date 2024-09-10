import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from '../todo/todo.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    TodoModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
