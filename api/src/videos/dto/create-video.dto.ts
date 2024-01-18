import { IsNotEmpty, MaxLength, IsString, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  category_id: string;

  @IsOptional()
  @IsString()
  description?: string | null;
}
