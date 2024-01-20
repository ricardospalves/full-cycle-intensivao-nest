import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsString, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class CreateVideoWithUploadDto extends CreateVideoDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;
}
