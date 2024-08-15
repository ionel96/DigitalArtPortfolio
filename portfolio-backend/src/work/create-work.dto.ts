import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateWorkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsUrl()
  image: string;

  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
