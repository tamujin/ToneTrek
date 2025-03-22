# Contributing to ToneTrek

First off, thank you for considering contributing to ToneTrek! It's people like you that make ToneTrek such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what behavior you expected to see
- Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this enhancement would be useful
- List some examples of how it would be used

### Pull Requests

1. Fork the repo and create your branch from `develop`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows the existing code style
5. Write a good commit message

#### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that don't affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

### Development Process

1. Create a new branch from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. Make your changes:
   - Write meaningful commit messages
   - Keep your changes focused and atomic
   - Add tests if applicable

3. Push to your fork and submit a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Wait for review. We may suggest changes, improvements, or alternatives.

### Style Guide

- Use 2 spaces for indentation
- Keep lines under 100 characters
- Use meaningful variable and function names
- Document complex code sections
- Follow React best practices and hooks rules
- Use TypeScript types/interfaces where possible

### Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Include integration tests for complex features
- Test across different browsers if making UI changes

## Additional Notes

### Issue and Pull Request Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

Thank you for contributing to ToneTrek! 🎉