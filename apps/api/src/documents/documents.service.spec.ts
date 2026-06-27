import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(() => {
    service = new DocumentsService();
  });

  it('returns chunk metadata for pasted documents', () => {
    const result = service.pasteDocument({
      title: 'Long document',
      content: 'a'.repeat(1200),
    });

    expect(result).toMatchObject({
      title: 'Long document',
      status: 'chunked',
      chunkCount: 2,
    });
    expect(result.documentId).toEqual(expect.any(String));
    expect(result.chunks).toHaveLength(2);
    expect(result.chunks[0]).toMatchObject({
      chunkIndex: 0,
      charStart: 0,
      charEnd: 1000,
    });
    expect(result.chunks[1]).toMatchObject({
      chunkIndex: 1,
      charStart: 850,
      charEnd: 1200,
    });
  });
});
