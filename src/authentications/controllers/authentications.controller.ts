import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentications.service';
import { CreateAuthenticationDto } from '../dto/create-authentication.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/authentication')
@ApiTags('Authentication Controller')
export class AuthenticationsController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.create(createAuthenticationDto);
  }
}
 