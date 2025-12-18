# Contributing to TahsinUI

First off, thank you for considering contributing to TahsinUI! It's people like you that make TahsinUI such a great project.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps to reproduce the problem** in as many details as possible.
- **Describe the behavior you observed** after following the steps and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see** instead and why.
- **Include screenshots and animated GIFs** if possible.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the current behavior** and **explain which behavior you expected to see** instead and why.
- **Explain why this enhancement would be useful** to most TahsinUI users.

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Include screenshots and animated GIFs in your pull request whenever possible
- Follow the TypeScript and React styleguides
- Include thoughtfully-worded, well-structured tests
- Document new code based on the Documentation Styleguide
- End all files with a newline

## Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Avoid using `any` type; use proper types or `unknown` instead
- Use interfaces for object shapes, types for unions/intersections
- Export types and interfaces when they're used in multiple files

### React

- Use functional components with hooks
- Use meaningful component and variable names
- Keep components small and focused on a single responsibility
- Use `'use client'` directive only when necessary (for client-side features)

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design principles
- Maintain consistent spacing using Tailwind's spacing scale
- Use semantic HTML elements

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays
- Use optional chaining and nullish coalescing when appropriate

### File Naming

- Use PascalCase for component files: `ComponentName.tsx`
- Use camelCase for utility files: `utilityName.ts`
- Use kebab-case for page routes: `page-name/page.tsx`

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

#### Examples

```
feat(feed): add infinite scroll functionality

Implements infinite scroll for the main feed using Intersection Observer API.
This improves user experience by automatically loading more content as they scroll.

Closes #123
```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting a PR
- Aim for meaningful test coverage

## Documentation

- Update the README.md if needed
- Add JSDoc comments for public functions and components
- Update the CHANGELOG.md with your changes

## Questions?

Don't hesitate to ask questions by creating an issue with the `question` label. We're here to help!

Thank you for contributing to TahsinUI! 🎉

