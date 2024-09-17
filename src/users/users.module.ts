import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserContactService } from './services/user-contact.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserContact])],
  controllers: [UsersController],
  providers: [UsersService, UserContactService],
  exports: [UsersService],
})
export class UsersModule {}
