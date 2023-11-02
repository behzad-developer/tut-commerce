import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentications.service';
import { AuthenticationsController } from './controllers/authentications.controller';
import { UserEntity } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secretOrPrivateKey: 'jwt-secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthenticationsController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
