# Terminal Autocomplete Specification

The web terminal features Bash-style tab completion for both commands and file paths. It uses a single source of truth for valid commands, an autocomplete engine that provides suggestions based on the current input token, and integrates with the terminal component to intercept the Tab key and auto-complete or list suggestions.
