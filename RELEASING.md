# Void Engine releases

Void Engine versions use the `VERSION` file as the canonical version number.

A release contains two downloadable assets:

- `VoidEngine-<version>.zip` — the complete runnable engine package.
- `VoidEngine-Setup-<version>.exe` — the version-specific online installer.

The installer for a version downloads only the matching engine package from that GitHub Release.

Example for 0.0.1:

```
Release v0.0.1
├── VoidEngine-0.0.1.zip
└── VoidEngine-Setup-0.0.1.exe
```

Build output and CLion/CMake generated directories are intentionally not committed to the repository.
