import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class User {
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty({
    message: 'Please inform your complete name',
  })
  completeName: string;
  entryDate: Date;
}
