# Versioning Policy

`@emlinh/ai-shared` tuân theo [Semantic Versioning (SemVer)](https://semver.org/) và sử dụng [Changesets](https://github.com/changesets/changesets) để manage releases.

## 📋 Semantic Versioning

### Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, backwards compatible

## 🔄 Release Types

### Patch Releases (0.1.0 → 0.1.1)

**Khi nào**: Bug fixes, documentation updates, internal improvements

**Examples**:
- Fix validation logic trong existing schemas
- Update documentation
- Performance improvements
- Internal refactoring không affect public API
- Fix TypeScript type definitions

```typescript
// Before (có bug)
const UserSchema = z.object({
  email: z.string(), // Thiếu email validation
});

// After (fixed)
const UserSchema = z.object({
  email: z.string().email(), // Thêm email validation
});
```

### Minor Releases (0.1.0 → 0.2.0)

**Khi nào**: New features, new types, backwards compatible additions

**Examples**:
- Thêm new types hoặc schemas
- Thêm optional fields vào existing types
- Thêm new validation methods
- Extend existing enums với new values

```typescript
// Before
interface User {
  id: string;
  email: string;
  name: string;
}

// After - thêm optional field (minor)
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string; // New optional field
}

// Before
type UserRole = 'user' | 'admin';

// After - extend enum (minor)
type UserRole = 'user' | 'admin' | 'moderator'; // New value
```

### Major Releases (0.1.0 → 1.0.0)

**Khi nào**: Breaking changes that require code updates

**Examples**:
- Remove hoặc rename existing types
- Change required fields
- Change field types
- Remove hoặc change existing enum values
- Change function signatures

```typescript
// Before
interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
}

// After - breaking changes (major)
interface User {
  id: string;
  email: string;
  fullName: string; // Renamed from 'name'
  status: 'active' | 'inactive'; // Changed from boolean
  // isActive removed
}
```

## 🚀 Release Process

### 1. Development

```bash
# Create feature branch
git checkout -b feature/new-user-types

# Make changes
# Add tests
# Update documentation
```

### 2. Create Changeset

```bash
npx changeset
```

Chọn appropriate version bump:
- **patch**: Bug fixes
- **minor**: New features  
- **major**: Breaking changes

### 3. Pull Request

- Create PR với changes
- Include changeset trong PR
- Ensure tests pass
- Update documentation

### 4. Merge & Release

- Merge PR vào main branch
- GitHub Actions sẽ automatically:
  - Run tests
  - Build package
  - Create release PR (nếu có changesets)
  - Publish to NPM (khi release PR được merged)

## 📅 Release Schedule

### Regular Releases

- **Patch releases**: As needed (bug fixes)
- **Minor releases**: Bi-weekly hoặc khi có enough features
- **Major releases**: Quarterly hoặc khi có significant breaking changes

### Emergency Releases

- Critical bug fixes có thể được released immediately
- Security patches có priority cao nhất

## 🔒 Stability Guarantees

### Pre-1.0 (0.x.x)

- **Minor versions** có thể contain breaking changes
- **Patch versions** chỉ contain bug fixes
- API có thể change rapidly

### Post-1.0 (1.x.x+)

- **Major versions** only cho breaking changes
- **Minor versions** backwards compatible
- **Patch versions** chỉ bug fixes
- Deprecated features sẽ be supported for ít nhất 1 major version

## 📖 Migration Guides

### Breaking Changes

Mỗi major release sẽ include:
- **CHANGELOG.md** với detailed changes
- **Migration guide** với step-by-step instructions
- **Codemod scripts** nếu có thể

### Example Migration Guide

```markdown
## Migrating from v0.x to v1.0

### User Interface Changes

**Before (v0.x)**:
```typescript
interface User {
  name: string;
  isActive: boolean;
}
```

**After (v1.0)**:
```typescript
interface User {
  fullName: string; // Renamed from 'name'
  status: 'active' | 'inactive'; // Changed from 'isActive'
}
```

**Migration Steps**:
1. Rename `name` to `fullName`
2. Replace `isActive: true` with `status: 'active'`
3. Replace `isActive: false` with `status: 'inactive'`
```

## 🏷️ Tagging Strategy

### Git Tags

- `v1.0.0`: Release tags
- `v1.0.0-beta.1`: Pre-release tags
- `v1.0.0-alpha.1`: Alpha releases

### NPM Tags

- `latest`: Stable releases
- `beta`: Beta releases
- `alpha`: Alpha releases
- `next`: Development releases

## 📊 Deprecation Policy

### Deprecation Process

1. **Mark as deprecated** trong code với JSDoc
2. **Add deprecation warning** trong documentation
3. **Provide migration path** trong changelog
4. **Remove trong next major version**

### Example Deprecation

```typescript
/**
 * @deprecated Use `fullName` instead. Will be removed in v2.0.0
 */
interface User {
  /** @deprecated Use `fullName` instead */
  name?: string;
  fullName: string;
}
```

## 🔍 Version Support

### Support Matrix

| Version | Status | Support Until | Notes |
|---------|--------|---------------|-------|
| 1.x.x   | Active | TBD | Current stable |
| 0.x.x   | Maintenance | 6 months after 1.0.0 | Bug fixes only |

### End of Life

- **6 months notice** trước khi end support
- **Security patches** cho supported versions
- **Migration assistance** cho major upgrades

## 📝 Changelog Format

Chúng tôi sử dụng [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
## [1.0.0] - 2024-01-15

### Added
- New `Context` types and schemas
- Support for file attachments in messages

### Changed
- **BREAKING**: Renamed `User.name` to `User.fullName`
- **BREAKING**: Changed `User.isActive` to `User.status`

### Deprecated
- `MessageContent.text` - use `MessageContent.content` instead

### Removed
- **BREAKING**: Removed deprecated `User.username` field

### Fixed
- Fixed email validation in `UserSchema`
- Fixed optional field handling in `CreateUserSchema`

### Security
- Updated dependencies to fix security vulnerabilities
```

---

Versioning policy này đảm bảo predictable releases và clear migration paths cho tất cả users của `@emlinh/ai-shared`.