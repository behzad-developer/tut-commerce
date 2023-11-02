import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateAuthenticationDto {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 65123456,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(61000000)
  @Max(65999999)
  phonenumber: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'passwd01',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
