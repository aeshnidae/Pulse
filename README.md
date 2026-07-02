# Pulse

A high-performance, minimalist desktop widget designed to combat time blindness through visual progress tracking and rhythmic auditory cues.

## Overview
Pulse anchors you to the present moment. By visualizing the day's progression and providing customizable, persistent triggers, it helps you break the "later" habit and maintain focus on immediate tasks.

## Technical Architecture
Pulse is built for performance and security using:
- **Core (Backend):** Rust for efficient system-level operations and notification handling.
- **UI (Frontend):** React with Tailwind CSS for styling and Framer Motion for fluid, minimalist animations.
- **Framework:** Tauri, providing a lightweight and secure bridge between the web-based UI and native system features.

## Current Status
- [x] Initial project scaffolding and "Hello World" build.
- [x] Basic UI: Interactive gray circle with fade-in animation.
- [x] Logic: Countdown timer (5s) with native OS notification trigger.
- [ ] Implement live daily progress calculation.
- [ ] Integrate system-level audio triggers.
- [ ] Build settings persistence (JSON/Local storage).
- [ ] Optimize window transparency and "always-on-top" behaviors.