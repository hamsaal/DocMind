import { Body, Controller, Post } from '@nestjs/common';
import { PasteDocumentDto } from './dto/paste-document.dto';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('paste')
  pasteDocument(@Body() dto: PasteDocumentDto) {
    return this.documentsService.pasteDocument(dto);
  }
}
