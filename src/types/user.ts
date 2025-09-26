import { z } from 'zod';

/**
 * User role trong hệ thống
 */
export const UserRoleSchema = z.enum(['user', 'assistant', 'system']);
export type UserRole = z.infer<typeof UserRoleSchema>;

/**
 * User preferences và settings
 */
export const UserPreferencesSchema = z.object({
  language: z.string().default('vi'),
  theme: z.enum(['light', 'dark', 'auto']).default('auto'),
  notifications: z.boolean().default(true),
  autoSave: z.boolean().default(true),
});
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

/**
 * User profile information
 */
export const UserProfileSchema = z.object({
  displayName: z.string().optional(),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
  timezone: z.string().default('Asia/Ho_Chi_Minh'),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

/**
 * Core User entity
 */
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().optional(),
  username: z.string().min(1),
  role: UserRoleSchema.default('user'),
  profile: UserProfileSchema.optional(),
  preferences: UserPreferencesSchema.default({}),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastActiveAt: z.date().optional(),
  isActive: z.boolean().default(true),
});

export type User = z.infer<typeof UserSchema>;

/**
 * User creation payload (không bao gồm các field tự động generate)
 */
export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastActiveAt: true,
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

/**
 * User update payload (tất cả fields đều optional)
 */
export const UpdateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
}).partial();

export type UpdateUser = z.infer<typeof UpdateUserSchema>;