import { IsString, MaxLength, MinLength } from 'class-validator';

export class PasteDocumentDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title: string;

  @IsString()
  @MinLength(50)
  @MaxLength(200000)
  content: string;
}
