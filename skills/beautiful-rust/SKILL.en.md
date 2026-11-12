---
name: beautiful-rust
description: Three Agent Skills and lints config that teach coding agents to write, review, port, and enforce idiomatic Rust. Synthesized from Google Rust Style Guide, Rust API Guidelines, Effective Rust, Rust Design Patterns, and Microsoft Pragmatic Rust.
---

# Beautiful Rust: Idiomatic Rust for Coding Agents

Three standard Agent Skills and a lints config that teach coding agents to write, review, port, and enforce idiomatic Rust:

- **`rust-best-practices`** loads whenever an agent writes or changes Rust, steering it toward idiomatic, robust, maintainable code.
- **`rust-review`** reviews existing Rust code, a file, crate, or diff, producing a prioritized report where every finding cites the rule it breaks and shows the concrete fix.
- **`rust-port`** ports C, C++, Python, Go, or JavaScript to idiomatic Rust with identical behavior, porting tests first to guarantee equivalence.
- **`lints/`** provides drop-in clippy configurations that enforce machine-checkable rules in CI.

## Core Rules

1. **Mindset:** Write Rust-shaped code. Don't port Java/C++ patterns 1:1. Model errors with `Result`, resources with ownership and `Drop`.
2. **Errors:** Never call `.unwrap()` or `.expect()` in library/production code unless proving an invariant. Use custom error enums with `thiserror` or `anyhow`.
3. **Memory & Performance:** Borrow before owning (`&str`, `&[T]` over `String`, `Vec`). Avoid premature heap allocations in hot paths.
4. **Concurrency:** Explicit thread safety with standard primitives (`Arc`, `Mutex`, channels). Avoid data races and deadlocks.
5. **Unsafe:** Minimize unsafe blocks, always document preconditions under `// SAFETY:`.
