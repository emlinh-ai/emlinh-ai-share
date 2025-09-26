import { z } from 'zod';
import { UserRoleSchema } from './user';

/**
 * Message content types
 */
export const MessageContentTypeSchema = z.enum(['text', 'image', 'file', 'code', 'system']);
export type MessageContentType = z.infer<typeof MessageContentTypeSchema>;

/**
 * Message status
 */
export const MessageStatusSchema = z.enum(['pending', 'sent', 'delivered', 'read', 'failed']);
export type MessageStatus = z.infer<typeof MessageStatusSchema>;

/**
 * File attachment schema
 */
export const FileAttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
});
export type FileAttachment = z.infer<typeof FileAttachmentSchema>;

/**
 * Code block schema
 */
export const CodeBlockSchema = z.object({
  language: z.string(),
  code: z.string(),
  filename: z.string().optional(),
});
export type CodeBlock = z.infer<typeof CodeBlockSchema>;

/**
 * Message content based on type
 */
export const MessageContentSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text'),
    text: z.string(),
  }),
  z.object({
    type: z.literal('image'),
    imageUrl: z.string().url(),
    alt: z.string().optional(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('file'),
    attachment: FileAttachmentSchema,
  }),
  z.object({
    type: z.literal('code'),
    codeBlock: CodeBlockSchema,
  }),
  z.object({
    type: z.literal('system'),
    systemMessage: z.string(),
    level: z.enum(['info', 'warning', 'error']).default('info'),
  }),
]);
export type MessageContent = z.infer<typeof MessageContentSchema>;

/**
 * Message metadata
 */
export const MessageMetadataSchema = z.object({
  edited: z.boolean().default(false),
  editedAt: z.date().optional(),
  replyToId: z.string().uuid().optional(),
  mentions: z.array(z.string().uuid()).default([]),
  reactions: z.record(z.string(), z.array(z.string().uuid())).default({}),
  tokenCount: z.number().optional(),
  processingTime: z.number().optional(),
});
export type MessageMetadata = z.infer<typeof MessageMetadataSchema>;

/**
 * Core Message entity
 */
export const MessageSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  role: UserRoleSchema,
  content: MessageContentSchema,
  metadata: MessageMetadataSchema.default({}),
  status: MessageStatusSchema.default('sent'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Message = z.infer<typeof MessageSchema>;

/**
 * Message creation payload
 */
export const CreateMessageSchema = MessageSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateMessage = z.infer<typeof CreateMessageSchema>;

/**
 * Message update payload
 */
export const UpdateMessageSchema = MessageSchema.partial().omit({
  id: true,
  conversationId: true,
  createdAt: true,
});

export type UpdateMessage = z.infer<typeof UpdateMessageSchema>;