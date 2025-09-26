import { z } from 'zod';

/**
 * Conversation status
 */
export const ConversationStatusSchema = z.enum(['active', 'archived', 'deleted']);
export type ConversationStatus = z.infer<typeof ConversationStatusSchema>;

/**
 * Conversation type
 */
export const ConversationTypeSchema = z.enum(['chat', 'task', 'brainstorm', 'code_review']);
export type ConversationType = z.infer<typeof ConversationTypeSchema>;

/**
 * Conversation settings
 */
export const ConversationSettingsSchema = z.object({
  model: z.string().default('gpt-4'),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().positive().optional(),
  systemPrompt: z.string().optional(),
  autoSave: z.boolean().default(true),
  notifications: z.boolean().default(true),
});
export type ConversationSettings = z.infer<typeof ConversationSettingsSchema>;

/**
 * Conversation metadata
 */
export const ConversationMetadataSchema = z.object({
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  isStarred: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  messageCount: z.number().default(0),
  lastMessageAt: z.date().optional(),
  totalTokens: z.number().default(0),
});
export type ConversationMetadata = z.infer<typeof ConversationMetadataSchema>;

/**
 * Core Conversation entity
 */
export const ConversationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  userId: z.string().uuid(),
  type: ConversationTypeSchema.default('chat'),
  status: ConversationStatusSchema.default('active'),
  settings: ConversationSettingsSchema.default({}),
  metadata: ConversationMetadataSchema.default({}),
  createdAt: z.date(),
  updatedAt: z.date(),
  archivedAt: z.date().optional(),
});

export type Conversation = z.infer<typeof ConversationSchema>;

/**
 * Conversation creation payload
 */
export const CreateConversationSchema = ConversationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  archivedAt: true,
});

export type CreateConversation = z.infer<typeof CreateConversationSchema>;

/**
 * Conversation update payload
 */
export const UpdateConversationSchema = ConversationSchema.partial().omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type UpdateConversation = z.infer<typeof UpdateConversationSchema>;

/**
 * Conversation list item (for performance, không load full data)
 */
export const ConversationListItemSchema = ConversationSchema.pick({
  id: true,
  title: true,
  type: true,
  status: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  messageCount: z.number(),
  lastMessageAt: z.date().optional(),
  lastMessagePreview: z.string().optional(),
});

export type ConversationListItem = z.infer<typeof ConversationListItemSchema>;