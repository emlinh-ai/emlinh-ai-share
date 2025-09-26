# Contributing Guide

Cảm ơn bạn đã quan tâm đến việc đóng góp cho `@emlinh-ai/types`! 

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm hoặc yarn hoặc pnpm

### Setup Development Environment

1. Fork repository này
2. Clone fork của bạn:
   ```bash
   git clone https://github.com/your-username/ai-shared.git
   cd ai-shared
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Chạy tests để đảm bảo mọi thứ hoạt động:
   ```bash
   npm test
   ```

## 📝 Development Workflow

### 1. Tạo Branch mới

```bash
git checkout -b feature/your-feature-name
# hoặc
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Thêm hoặc sửa đổi types trong `src/types/`
- Đảm bảo tất cả types đều có corresponding Zod schemas
- Thêm tests cho changes của bạn trong `src/tests/`
- Update documentation nếu cần thiết

### 3. Run Tests

```bash
# Chạy tất cả tests
npm test

# Chạy tests với coverage
npm run test:coverage

# Type checking
npm run type-check
```

### 4. Build & Documentation

```bash
# Build types
npm run build:types

# Build documentation
npm run build:docs

# Chạy documentation locally
npm run dev
```

## 🧪 Testing Guidelines

### Writing Tests

- Mỗi schema phải có comprehensive tests
- Test cả valid và invalid cases
- Test default values và optional fields
- Test edge cases và boundary conditions

### Test Structure

```typescript
describe('YourSchema', () => {
  describe('valid cases', () => {
    it('should validate correct data', () => {
      // Test implementation
    });
  });

  describe('invalid cases', () => {
    it('should reject invalid data', () => {
      // Test implementation
    });
  });
});
```

## 📋 Code Standards

### TypeScript

- Sử dụng strict TypeScript configuration
- Tất cả types phải được export
- Sử dụng meaningful names cho types và properties
- Add JSDoc comments cho complex types

### Zod Schemas

- Mỗi TypeScript type phải có corresponding Zod schema
- Sử dụng appropriate validation rules
- Set reasonable defaults cho optional fields
- Use discriminated unions khi appropriate

### File Organization

```
src/
├── types/
│   ├── user.ts          # User-related types & schemas
│   ├── message.ts       # Message-related types & schemas
│   ├── conversation.ts  # Conversation-related types & schemas
│   ├── context.ts       # Context-related types & schemas
│   ├── session.ts       # Session-related types & schemas
│   └── index.ts         # Export all types
├── tests/
│   ├── user.test.ts     # User schema tests
│   ├── message.test.ts  # Message schema tests
│   └── ...
└── index.ts             # Main entry point
```

## 🔄 Versioning & Releases

Chúng tôi sử dụng [Changesets](https://github.com/changesets/changesets) để manage versions và releases.

### Creating a Changeset

Khi bạn make changes, tạo changeset:

```bash
npx changeset
```

Chọn:
- **patch**: Bug fixes, minor improvements
- **minor**: New features, non-breaking changes  
- **major**: Breaking changes

### Changeset Guidelines

- **patch**: Bug fixes, documentation updates, internal refactoring
- **minor**: New types, new schemas, new optional fields
- **major**: Breaking changes to existing types, removing fields, changing field types

## 📖 Documentation

### README Updates

Update README.md nếu bạn:
- Thêm new types hoặc schemas
- Change API surface
- Add new features

### API Documentation

Update `docs/api.md` với:
- New type definitions
- Schema examples
- Usage patterns

### Examples

Add examples trong `docs/examples.md` cho:
- New use cases
- Complex scenarios
- Best practices

## 🚫 What NOT to do

- ❌ Không commit generated files (`dist/`, `docs-dist/`)
- ❌ Không thay đổi version numbers manually
- ❌ Không skip tests
- ❌ Không make breaking changes without major version bump
- ❌ Không add dependencies without discussion

## ✅ Pull Request Process

1. **Ensure tests pass**: `npm test`
2. **Create changeset**: `npx changeset` (nếu cần)
3. **Update documentation** nếu cần thiết
4. **Create PR** với clear description
5. **Address review feedback**

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (patch)
- [ ] New feature (minor)
- [ ] Breaking change (major)
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Updated documentation

## Changeset
- [ ] Created changeset (if needed)
```

## 🐛 Reporting Issues

Khi report issues, include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- TypeScript/Node.js versions
- Code examples nếu có thể

## 💬 Getting Help

- Create GitHub issue cho questions
- Check existing issues trước khi tạo mới
- Provide context và examples

## 📜 Code of Conduct

- Be respectful và professional
- Welcome newcomers
- Focus on constructive feedback
- Help maintain a positive community

---

Cảm ơn bạn đã đóng góp! 🎉