import { z } from 'zod';

/**
 * Context source types
 */
export const ContextSourceSchema = z.enum(['file', 'web', 'database', 'api', 'user_input', 'system']);
export type ContextSource = z.infer<typeof ContextSourceSchema>;

/**
 * Context data types
 */
export const ContextDataTypeSchema = z.enum(['text', 'code', 'image', 'document', 'structured']);
export type ContextDataType = z.infer<typeof ContextDataTypeSchema>;

/**
 * File context metadata
 */
export const FileContextMetadataSchema = z.object({
  filename: z.string(),
  path: z.string(),
  size: z.number(),
  mimeType: z.string(),
  encoding: z.string().optional(),
  language: z.string().optional(),
  lineCount: z.number().optional(),
});
export type FileContextMetadata = z.infer<typeof FileContextMetadataSchema>;

/**
 * Web context metadata
 */
export const WebContextMetadataSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
  domain: z.string(),
  scrapedAt: z.date(),
  contentType: z.string().optional(),
});
export type WebContextMetadata = z.infer<typeof WebContextMetadataSchema>;

/**
 * Database context metadata
 */
export const DatabaseContextMetadataSchema = z.object({
  table: z.string(),
  schema: z.string().optional(),
  query: z.string().optional(),
  rowCount: z.number().optional(),
});
export type DatabaseContextMetadata = z.infer<typeof DatabaseContextMetadataSchema>;

/**
 * Context metadata union
 */
export const ContextMetadataSchema = z.discriminatedUnion('source', [
  z.object({
    source: z.literal('file'),
    file: FileContextMetadataSchema,
  }),
  z.object({
    source: z.literal('web'),
    web: WebContextMetadataSchema,
  }),
  z.object({
    source: z.literal('database'),
    database: DatabaseContextMetadataSchema,
  }),
  z.object({
    source: z.literal('api'),
    endpoint: z.string(),
    method: z.string(),
    responseTime: z.number().optional(),
  }),
  z.object({
    source: z.literal('user_input'),
    inputType: z.string(),
    timestamp: z.date(),
  }),
  z.object({
    source: z.literal('system'),
    component: z.string(),
    version: z.string().optional(),
  }),
]);
export type ContextMetadata = z.infer<typeof ContextMetadataSchema>;

/**
 * Context chunk (for large content)
 */
export const ContextChunkSchema = z.object({
  id: z.string(),
  index: z.number(),
  content: z.string(),
  startOffset: z.number().optional(),
  endOffset: z.number().optional(),
  tokens: z.number().optional(),
});
export type ContextChunk = z.infer<typeof ContextChunkSchema>;

/**
 * Core Context entity
 */
export const ContextSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  source: ContextSourceSchema,
  dataType: ContextDataTypeSchema,
  content: z.string(),
  chunks: z.array(ContextChunkSchema).optional(),
  metadata: ContextMetadataSchema,
  tags: z.array(z.string()).default([]),
  relevanceScore: z.number().min(0).max(1).optional(),
  tokens: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  expiresAt: z.date().optional(),
});

export type Context = z.infer<typeof ContextSchema>;

/**
 * Context payload for API requests
 */
export const ContextPayloadSchema = z.object({
  contexts: z.array(ContextSchema),
  maxTokens: z.number().positive().optional(),
  relevanceThreshold: z.number().min(0).max(1).default(0.5),
  includeMetadata: z.boolean().default(true),
  chunkSize: z.number().positive().optional(),
});

export type ContextPayload = z.infer<typeof ContextPayloadSchema>;

/**
 * Context creation payload
 */
export const CreateContextSchema = ContextSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateContext = z.infer<typeof CreateContextSchema>;

/**
 * Context search query
 */
export const ContextSearchQuerySchema = z.object({
  query: z.string(),
  sources: z.array(ContextSourceSchema).optional(),
  dataTypes: z.array(ContextDataTypeSchema).optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().positive().default(10),
  offset: z.number().min(0).default(0),
  minRelevance: z.number().min(0).max(1).default(0.3),
});

export type ContextSearchQuery = z.infer<typeof ContextSearchQuerySchema>;