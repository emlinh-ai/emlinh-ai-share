import { describe, it, expect } from 'vitest';
import { 
  ContextSchema,
  ContextPayloadSchema,
  ContextSourceSchema,
  ContextDataTypeSchema,
  ContextMetadataSchema,
  ContextSearchQuerySchema
} from '../types/context';

describe('Context Schemas', () => {
  describe('ContextSourceSchema', () => {
    it('should validate valid sources', () => {
      const validSources = ['file', 'web', 'database', 'api', 'user_input', 'system'];
      validSources.forEach(source => {
        expect(ContextSourceSchema.parse(source)).toBe(source);
      });
    });

    it('should reject invalid sources', () => {
      expect(() => ContextSourceSchema.parse('invalid')).toThrow();
    });
  });

  describe('ContextDataTypeSchema', () => {
    it('should validate valid data types', () => {
      const validTypes = ['text', 'code', 'image', 'document', 'structured'];
      validTypes.forEach(type => {
        expect(ContextDataTypeSchema.parse(type)).toBe(type);
      });
    });
  });

  describe('ContextMetadataSchema', () => {
    it('should validate file metadata', () => {
      const metadata = {
        source: 'file' as const,
        file: {
          filename: 'test.ts',
          path: '/src/test.ts',
          size: 1024,
          mimeType: 'text/typescript',
          encoding: 'utf-8',
          language: 'typescript',
          lineCount: 50,
        },
      };
      const result = ContextMetadataSchema.parse(metadata);
      expect(result.source).toBe('file');
      expect(result.file.filename).toBe('test.ts');
    });

    it('should validate web metadata', () => {
      const metadata = {
        source: 'web' as const,
        web: {
          url: 'https://example.com/article',
          title: 'Test Article',
          domain: 'example.com',
          scrapedAt: new Date(),
          contentType: 'text/html',
        },
      };
      const result = ContextMetadataSchema.parse(metadata);
      expect(result.source).toBe('web');
      expect(result.web.domain).toBe('example.com');
    });

    it('should validate database metadata', () => {
      const metadata = {
        source: 'database' as const,
        database: {
          table: 'users',
          schema: 'public',
          query: 'SELECT * FROM users WHERE active = true',
          rowCount: 100,
        },
      };
      const result = ContextMetadataSchema.parse(metadata);
      expect(result.source).toBe('database');
      expect(result.database.table).toBe('users');
    });

    it('should validate api metadata', () => {
      const metadata = {
        source: 'api' as const,
        endpoint: '/api/v1/users',
        method: 'GET',
        responseTime: 150,
      };
      const result = ContextMetadataSchema.parse(metadata);
      expect(result.source).toBe('api');
      expect(result.endpoint).toBe('/api/v1/users');
    });

    it('should validate user_input metadata', () => {
      const metadata = {
        source: 'user_input' as const,
        inputType: 'text',
        timestamp: new Date(),
      };
      const result = ContextMetadataSchema.parse(metadata);
      expect(result.source).toBe('user_input');
      expect(result.inputType).toBe('text');
    });

    it('should validate system metadata', () => {
      const metadata = {
        source: 'system' as const,
        component: 'auth-service',
        version: '1.0.0',
      };
      const result = ContextMetadataSchema.parse(metadata);
      expect(result.source).toBe('system');
      expect(result.component).toBe('auth-service');
    });
  });

  describe('ContextSchema', () => {
    const validContext = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Test Context',
      description: 'A test context',
      source: 'file' as const,
      dataType: 'code' as const,
      content: 'const hello = "world";',
      metadata: {
        source: 'file' as const,
        file: {
          filename: 'test.ts',
          path: '/src/test.ts',
          size: 1024,
          mimeType: 'text/typescript',
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should validate valid context', () => {
      const result = ContextSchema.parse(validContext);
      expect(result.id).toBe(validContext.id);
      expect(result.source).toBe('file');
      expect(result.dataType).toBe('code');
    });

    it('should apply defaults', () => {
      const result = ContextSchema.parse(validContext);
      expect(result.tags).toEqual([]);
    });

    it('should validate with chunks', () => {
      const contextWithChunks = {
        ...validContext,
        chunks: [
          {
            id: 'chunk-1',
            index: 0,
            content: 'const hello = "world";',
            startOffset: 0,
            endOffset: 22,
            tokens: 5,
          },
        ],
      };
      const result = ContextSchema.parse(contextWithChunks);
      expect(result.chunks).toHaveLength(1);
      expect(result.chunks![0].id).toBe('chunk-1');
    });

    it('should validate relevance score range', () => {
      const contextWithScore = {
        ...validContext,
        relevanceScore: 0.8,
      };
      const result = ContextSchema.parse(contextWithScore);
      expect(result.relevanceScore).toBe(0.8);

      // Test invalid scores
      expect(() => ContextSchema.parse({
        ...validContext,
        relevanceScore: 1.5,
      })).toThrow();

      expect(() => ContextSchema.parse({
        ...validContext,
        relevanceScore: -0.1,
      })).toThrow();
    });
  });

  describe('ContextPayloadSchema', () => {
    const validPayload = {
      contexts: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          title: 'Test Context',
          source: 'file' as const,
          dataType: 'code' as const,
          content: 'const hello = "world";',
          metadata: {
            source: 'file' as const,
            file: {
              filename: 'test.ts',
              path: '/src/test.ts',
              size: 1024,
              mimeType: 'text/typescript',
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };

    it('should validate valid payload', () => {
      const result = ContextPayloadSchema.parse(validPayload);
      expect(result.contexts).toHaveLength(1);
      expect(result.relevanceThreshold).toBe(0.5);
      expect(result.includeMetadata).toBe(true);
    });

    it('should validate with custom settings', () => {
      const customPayload = {
        ...validPayload,
        maxTokens: 1000,
        relevanceThreshold: 0.7,
        includeMetadata: false,
        chunkSize: 512,
      };
      const result = ContextPayloadSchema.parse(customPayload);
      expect(result.maxTokens).toBe(1000);
      expect(result.relevanceThreshold).toBe(0.7);
      expect(result.includeMetadata).toBe(false);
      expect(result.chunkSize).toBe(512);
    });
  });

  describe('ContextSearchQuerySchema', () => {
    it('should validate basic search query', () => {
      const query = {
        query: 'typescript functions',
      };
      const result = ContextSearchQuerySchema.parse(query);
      expect(result.query).toBe('typescript functions');
      expect(result.limit).toBe(10);
      expect(result.offset).toBe(0);
      expect(result.minRelevance).toBe(0.3);
    });

    it('should validate full search query', () => {
      const query = {
        query: 'user authentication',
        sources: ['file', 'web'] as const,
        dataTypes: ['code', 'document'] as const,
        tags: ['auth', 'security'],
        limit: 20,
        offset: 10,
        minRelevance: 0.5,
      };
      const result = ContextSearchQuerySchema.parse(query);
      expect(result.sources).toEqual(['file', 'web']);
      expect(result.dataTypes).toEqual(['code', 'document']);
      expect(result.tags).toEqual(['auth', 'security']);
      expect(result.limit).toBe(20);
      expect(result.offset).toBe(10);
      expect(result.minRelevance).toBe(0.5);
    });

    it('should reject invalid limit and offset', () => {
      expect(() => ContextSearchQuerySchema.parse({
        query: 'test',
        limit: 0,
      })).toThrow();

      expect(() => ContextSearchQuerySchema.parse({
        query: 'test',
        offset: -1,
      })).toThrow();
    });

    it('should reject invalid minRelevance', () => {
      expect(() => ContextSearchQuerySchema.parse({
        query: 'test',
        minRelevance: 1.5,
      })).toThrow();

      expect(() => ContextSearchQuerySchema.parse({
        query: 'test',
        minRelevance: -0.1,
      })).toThrow();
    });
  });
});