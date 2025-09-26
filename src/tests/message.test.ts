import { describe, it, expect } from 'vitest';
import { 
  MessageSchema,
  CreateMessageSchema,
  MessageContentSchema,
  MessageContentTypeSchema,
  MessageStatusSchema,
  FileAttachmentSchema,
  CodeBlockSchema
} from '../types/message';

describe('Message Schemas', () => {
  describe('MessageContentTypeSchema', () => {
    it('should validate valid content types', () => {
      const validTypes = ['text', 'image', 'file', 'code', 'system'];
      validTypes.forEach(type => {
        expect(MessageContentTypeSchema.parse(type)).toBe(type);
      });
    });

    it('should reject invalid content types', () => {
      expect(() => MessageContentTypeSchema.parse('invalid')).toThrow();
    });
  });

  describe('MessageStatusSchema', () => {
    it('should validate valid statuses', () => {
      const validStatuses = ['pending', 'sent', 'delivered', 'read', 'failed'];
      validStatuses.forEach(status => {
        expect(MessageStatusSchema.parse(status)).toBe(status);
      });
    });
  });

  describe('FileAttachmentSchema', () => {
    it('should validate file attachment', () => {
      const attachment = {
        id: 'file-123',
        name: 'document.pdf',
        type: 'application/pdf',
        size: 1024000,
        url: 'https://example.com/files/document.pdf',
        thumbnailUrl: 'https://example.com/thumbnails/document.jpg',
      };
      const result = FileAttachmentSchema.parse(attachment);
      expect(result).toEqual(attachment);
    });

    it('should reject invalid URL', () => {
      expect(() => FileAttachmentSchema.parse({
        id: 'file-123',
        name: 'document.pdf',
        type: 'application/pdf',
        size: 1024000,
        url: 'not-a-url',
      })).toThrow();
    });
  });

  describe('CodeBlockSchema', () => {
    it('should validate code block', () => {
      const codeBlock = {
        language: 'typescript',
        code: 'const hello = "world";',
        filename: 'hello.ts',
      };
      const result = CodeBlockSchema.parse(codeBlock);
      expect(result).toEqual(codeBlock);
    });

    it('should validate without filename', () => {
      const codeBlock = {
        language: 'javascript',
        code: 'console.log("hello");',
      };
      const result = CodeBlockSchema.parse(codeBlock);
      expect(result.filename).toBeUndefined();
    });
  });

  describe('MessageContentSchema', () => {
    it('should validate text content', () => {
      const content = {
        type: 'text' as const,
        text: 'Hello world',
      };
      const result = MessageContentSchema.parse(content);
      expect(result).toEqual(content);
    });

    it('should validate image content', () => {
      const content = {
        type: 'image' as const,
        imageUrl: 'https://example.com/image.jpg',
        alt: 'Test image',
        caption: 'A test image',
      };
      const result = MessageContentSchema.parse(content);
      expect(result).toEqual(content);
    });

    it('should validate file content', () => {
      const content = {
        type: 'file' as const,
        attachment: {
          id: 'file-123',
          name: 'document.pdf',
          type: 'application/pdf',
          size: 1024000,
          url: 'https://example.com/files/document.pdf',
        },
      };
      const result = MessageContentSchema.parse(content);
      expect(result).toEqual(content);
    });

    it('should validate code content', () => {
      const content = {
        type: 'code' as const,
        codeBlock: {
          language: 'typescript',
          code: 'const hello = "world";',
        },
      };
      const result = MessageContentSchema.parse(content);
      expect(result).toEqual(content);
    });

    it('should validate system content', () => {
      const content = {
        type: 'system' as const,
        systemMessage: 'User joined the conversation',
        level: 'info' as const,
      };
      const result = MessageContentSchema.parse(content);
      expect(result).toEqual(content);
    });

    it('should apply default level for system messages', () => {
      const content = {
        type: 'system' as const,
        systemMessage: 'System notification',
      };
      const result = MessageContentSchema.parse(content);
      expect(result.level).toBe('info');
    });
  });

  describe('MessageSchema', () => {
    const validMessage = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      conversationId: '123e4567-e89b-12d3-a456-426614174001',
      userId: '123e4567-e89b-12d3-a456-426614174002',
      role: 'user' as const,
      content: {
        type: 'text' as const,
        text: 'Hello world',
      },
      status: 'sent' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should validate valid message', () => {
      const result = MessageSchema.parse(validMessage);
      expect(result.id).toBe(validMessage.id);
      expect(result.content.type).toBe('text');
      expect(result.status).toBe('sent');
    });

    it('should apply defaults', () => {
      const minimalMessage = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        conversationId: '123e4567-e89b-12d3-a456-426614174001',
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: 'Hello',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = MessageSchema.parse(minimalMessage);
      expect(result.status).toBe('sent');
      expect(result.metadata.edited).toBe(false);
      expect(result.metadata.mentions).toEqual([]);
      expect(result.metadata.reactions).toEqual({});
    });

    it('should validate message with metadata', () => {
      const messageWithMetadata = {
        ...validMessage,
        metadata: {
          edited: true,
          editedAt: new Date(),
          replyToId: '123e4567-e89b-12d3-a456-426614174003',
          mentions: ['123e4567-e89b-12d3-a456-426614174004'],
          reactions: {
            '👍': ['123e4567-e89b-12d3-a456-426614174005'],
          },
          tokenCount: 10,
          processingTime: 150,
        },
      };
      const result = MessageSchema.parse(messageWithMetadata);
      expect(result.metadata.edited).toBe(true);
      expect(result.metadata.mentions).toHaveLength(1);
      expect(result.metadata.tokenCount).toBe(10);
    });
  });

  describe('CreateMessageSchema', () => {
    it('should validate message creation payload', () => {
      const createMessage = {
        conversationId: '123e4567-e89b-12d3-a456-426614174001',
        userId: '123e4567-e89b-12d3-a456-426614174002',
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: 'New message',
        },
        status: 'pending' as const,
      };
      const result = CreateMessageSchema.parse(createMessage);
      expect(result.conversationId).toBe(createMessage.conversationId);
      expect(result.userId).toBe(createMessage.userId);
      expect(result.role).toBe('user');
      expect(result.content.type).toBe('text');
      expect(result.status).toBe('pending');
      // Metadata should have defaults applied
      expect(result.metadata.edited).toBe(false);
    });

    it('should reject auto-generated fields', () => {
      // CreateMessageSchema should not accept id, createdAt, updatedAt
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        conversationId: '123e4567-e89b-12d3-a456-426614174001',
        role: 'user' as const,
        content: { type: 'text' as const, text: 'Hello' },
        createdAt: new Date(),
      };
      
      // Since omit removes these fields, they will be ignored, not throw
      const result = CreateMessageSchema.parse(invalidData);
      expect(result).not.toHaveProperty('id');
      expect(result).not.toHaveProperty('createdAt');
      expect(result.conversationId).toBe(invalidData.conversationId);
    });
  });
});