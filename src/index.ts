/**
 * @emlinh-ai/types
 * 
 * Shared TypeScript types and Zod schemas for EmLinh AI ecosystem
 * Provides type-safe data contracts between desktop app and AI service
 */

// Export all types and schemas
export * from './types';

// Utility functions for schema validation
export { z } from 'zod';

// Package version
export const VERSION = '0.1.0';