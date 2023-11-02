import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from '../dto/create-authentication.dto';

@Injectable()
export class AuthenticationService {
  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }
}
