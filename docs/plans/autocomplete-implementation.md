# Autocomplete Implementation Plan

## Goal

Add Bash-style tab completion to the web terminal for both commands and file paths.

## 1. Constants

Refactor `apps/web/src/lib/commands.ts` to export `VALID_COMMANDS` constant to ensure single source of truth.

## 2. Autocomplete Engine (`apps/web/src/lib/autocomplete.ts`)

Create a pure function `getSuggestions(input: string, currentPath: string): string[]`.

### Logic

1. **Command Completion**:
   - If input has no spaces (e.g., `he`), match against `VALID_COMMANDS`.
   - Return matching commands.

2. **File/Directory Completion**:
   - If input has spaces (e.g., `cd do` or `cat READ`), focus on the last token.
   - **Path Resolution**:
     - Handle `.` and `..` (optional, start simple).
     - Handle nested paths (e.g., `cd projects/pro`).
     - Split last token into `dirPath` and `searchQuery`.
     - Use `listDirectory` on `dirPath`.
   - Filter directory contents by `searchQuery`.
   - Return matching filenames.

## 3. Terminal Integration (`apps/web/src/components/apps/Terminal.tsx`)

Update `term.onKey` handler to intercept `Tab`.

### Interaction Logic

1. **Prevent Default**: Stop browser focus change.
2. **Fetch Suggestions**: Call `getSuggestions`.
3. **Handle Results**:
   - **0 Matches**: Do nothing (or flash terminal).
   - **1 Match**:
     - Auto-complete the current word.
     - Update `commandRef.current`.
     - Write missing chars to terminal.
   - **Multiple Matches**:
     - Print newline.
     - Print suggestions (space-separated or columns).
     - Reprint prompt and current command buffer.

## 4. Dependencies

- `apps/web/src/lib/filesystem.ts`: Need to ensure `listDirectory` is robust.
- `apps/web/src/lib/commands.ts`: Export valid commands.
