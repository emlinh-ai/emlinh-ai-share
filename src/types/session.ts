import { z } from 'zod';

/**
 * Session status
 */
export const SessionStatusSchema = z.enum(['active', 'inactive', 'expired']);
export type SessionStatus = z.infer<typeof SessionStatusSchema>;

/**
 * Session metadata
 */
export const SessionMetadataSchema = z.object({
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  platform: z.string().optional(),
  deviceId: z.string().optional(),
  location: z.string().optional(),
});
export type SessionMetadata = z.infer<typeof SessionMetadataSchema>;

/**
 * Core Session entity
 */
export const SessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  status: SessionStatusSchema.default('active'),
  metadata: SessionMetadataSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  expiresAt: z.date().optional(),
  lastAccessedAt: z.date().optional(),
});

export type Session = z.infer<typeof SessionSchema>;

/**
 * Session creation payload
 */
export const CreateSessionSchema = SessionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastAccessedAt: true,
});

export type CreateSession = z.infer<typeof CreateSessionSchema>;

/**
 * Session update payload
 */
export const UpdateSessionSchema = SessionSchema.partial().omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type UpdateSession = z.infer<typeof UpdateSessionSchema>;