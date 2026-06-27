import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PasteDocumentDto } from './dto/paste-document.dto';
import { DocumentChunk } from './types/document-chunk.type';

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 150;

@Injectable()
export class DocumentsService {
  pasteDocument(dto: PasteDocumentDto) {
    const chunks = this.chunkText(dto.content);

    return {
      documentId: randomUUID(),
      title: dto.title,
      status: 'chunked' as const,
      chunkCount: chunks.length,
      chunks,
    };
  }

  private chunkText(content: string): DocumentChunk[] {
    const chunks: DocumentChunk[] = [];
    let charStart = 0;

    while (charStart < content.length) {
      const charEnd = Math.min(charStart + CHUNK_SIZE, content.length);
      const chunkContent = content.slice(charStart, charEnd);

      if (chunkContent.trim().length > 0) {
        chunks.push({
          chunkIndex: chunks.length,
          content: chunkContent,
          charStart,
          charEnd,
        });
      }

      if (charEnd >= content.length) {
        break;
      }

      const nextStart = charEnd - CHUNK_OVERLAP;
      charStart = nextStart > charStart ? nextStart : charEnd;
    }

    return chunks;
  }
}
