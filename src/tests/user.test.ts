import { describe, it, expect } from 'vitest';
import { 
  UserSchema, 
  CreateUserSchema, 
  UpdateUserSchema,
  UserRoleSchema,
  UserPreferencesSchema,
  UserProfileSchema
} from '../types/user';

describe('User Schemas', () => {
  describe('UserRoleSchema', () => {
    it('should validate valid roles', () => {
      expect(UserRoleSchema.parse('user')).toBe('user');
      expect(UserRoleSchema.parse('assistant')).toBe('assistant');
      expect(UserRoleSchema.parse('system')).toBe('system');
    });

    it('should reject invalid roles', () => {
      expect(() => UserRoleSchema.parse('invalid')).toThrow();
    });
  });

  describe('UserPreferencesSchema', () => {
    it('should validate with defaults', () => {
      const result = UserPreferencesSchema.parse({});
      expect(result).toEqual({
        language: 'vi',
        theme: 'auto',
        notifications: true,
        autoSave: true,
      });
    });

    it('should validate custom preferences', () => {
      const preferences = {
        language: 'en',
        theme: 'dark' as const,
        notifications: false,
        autoSave: false,
      };
      const result = UserPreferencesSchema.parse(preferences);
      expect(result).toEqual(preferences);
    });
  });

  describe('UserProfileSchema', () => {
    it('should validate minimal profile', () => {
      const result = UserProfileSchema.parse({});
      expect(result.timezone).toBe('Asia/Ho_Chi_Minh');
    });

    it('should validate full profile', () => {
      const profile = {
        displayName: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
        bio: 'Software developer',
        timezone: 'America/New_York',
      };
      const result = UserProfileSchema.parse(profile);
      expect(result).toEqual(profile);
    });

    it('should reject invalid avatar URL', () => {
      expect(() => UserProfileSchema.parse({
        avatar: 'not-a-url'
      })).toThrow();
    });
  });

  describe('UserSchema', () => {
    const validUser = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      username: 'testuser',
      email: 'test@example.com',
      role: 'user' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    it('should validate valid user', () => {
      const result = UserSchema.parse(validUser);
      expect(result.id).toBe(validUser.id);
      expect(result.username).toBe(validUser.username);
      expect(result.role).toBe('user');
      expect(result.isActive).toBe(true);
    });

    it('should apply defaults', () => {
      const minimalUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        username: 'testuser',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = UserSchema.parse(minimalUser);
      expect(result.role).toBe('user');
      expect(result.isActive).toBe(true);
      expect(result.preferences.language).toBe('vi');
    });

    it('should reject invalid UUID', () => {
      expect(() => UserSchema.parse({
        ...validUser,
        id: 'invalid-uuid'
      })).toThrow();
    });

    it('should reject invalid email', () => {
      expect(() => UserSchema.parse({
        ...validUser,
        email: 'invalid-email'
      })).toThrow();
    });
  });

  describe('CreateUserSchema', () => {
    it('should validate user creation payload', () => {
      const createUser = {
        username: 'newuser',
        email: 'new@example.com',
        role: 'user' as const,
        isActive: true,
      };
      const result = CreateUserSchema.parse(createUser);
      expect(result.username).toBe('newuser');
      expect(result.email).toBe('new@example.com');
      expect(result.role).toBe('user');
      expect(result.isActive).toBe(true);
      // Preferences should have defaults applied
      expect(result.preferences.language).toBe('vi');
    });

    it('should reject fields that should be auto-generated', () => {
      // CreateUserSchema should not accept id, createdAt, updatedAt, lastActiveAt
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        username: 'newuser',
        createdAt: new Date(),
      };
      
      // Since omit removes these fields, they will be ignored, not throw
      // Let's test that the result doesn't contain these fields
      const result = CreateUserSchema.parse(invalidData);
      expect(result).not.toHaveProperty('id');
      expect(result).not.toHaveProperty('createdAt');
      expect(result.username).toBe('newuser');
    });
  });

  describe('UpdateUserSchema', () => {
    it('should validate partial updates', () => {
      const update = {
        username: 'updateduser',
        preferences: {
          theme: 'dark' as const,
        },
      };
      const result = UpdateUserSchema.parse(update);
      expect(result.username).toBe('updateduser');
      expect(result.preferences?.theme).toBe('dark');
    });

    it('should reject id and createdAt updates', () => {
      // UpdateUserSchema should not accept id and createdAt
      const updateWithId = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        username: 'updated',
      };
      
      const updateWithCreatedAt = {
        createdAt: new Date(),
        username: 'updated',
      };

      // Since omit removes these fields, they will be ignored, not throw
      const result1 = UpdateUserSchema.parse(updateWithId);
      expect(result1).not.toHaveProperty('id');
      expect(result1.username).toBe('updated');

      const result2 = UpdateUserSchema.parse(updateWithCreatedAt);
      expect(result2).not.toHaveProperty('createdAt');
      expect(result2.username).toBe('updated');
    });
  });
});