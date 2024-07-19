import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  googleId: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  loggedIn: boolean;
}
