# Pulse Project Review 🌟

Congratulations on your first personal project! For a first-ever project, **Pulse** is incredibly well-structured, clean, and forward-looking. You have chosen an excellent, modern, and highly performant tech stack:

- **Frontend:** React 19 + TypeScript + Zustand (Slices pattern) + Framer Motion
- **CSS:** Tailwind CSS v4 (using the fast `@tailwindcss/vite` plugin)
- **Native Wrapper:** Tauri v2 + Rust

Below is a detailed, constructive review highlighting your project's architectural strengths, potential bugs/gaps, and step-by-step recommendations for taking Pulse to the next level.

---

## 🏗️ 1. Architectural Strengths (What You Did Great!)

* **Zustand Slices Pattern:** Splitting your global state into `TimeSlice`, `UiSlice`, and `SettingsSlice` is a highly professional way of organizing complex state. It prevents monolithic files and keeps your domain logic separated cleanly.
* **Separation of Pure Logic vs. State Side-Effects:**
  - Your files in `src/utils/` (e.g., `timeLogic.ts`, `menuLogic.ts`) contain **pure functions** that do not depend on Zustand or React.
  - This is an excellent practice. Pure functions are predictable, bug-free, and incredibly easy to write unit tests for.
* **Modern Tooling:** Utilizing Vite with Tailwind CSS v4 is cutting-edge. It minimizes configuration files and keeps compilation incredibly fast.
* **Staggered & Fluid Animations:** Your usage of Framer Motion (for menu slide directions, fade-ins, and backdrop/bezel indicators) is smooth and adds a premium "native desktop widget" feel.

---

## 🐛 2. Gaps, Potential Bugs, & Areas of Improvement

### A. The Native Rust Alarm is Unlinked
* **What's happening:** In `src-tauri/src/lib.rs`, you have a great native command `trigger_alarm` that triggers an OS-level notification using the `notify-rust` crate:
  ```rust
  #[tauri::command]
  fn trigger_alarm(task: String) {
      Notification::new()
          .summary("Widget Alert")
          .body(&format!("Time to {}", task))
          .show()
          .unwrap();
  }
  ```
* **The gap:** This command is registered but never actually called from your React frontend! In `src/state/quickTaskActions.ts`, when a task ends, you have a comment `// Send notification` but do not invoke the backend:
  ```typescript
  if (isQuickTaskActive && currentState.quickTaskEnd != null && now >= currentState.quickTaskEnd) {
    isQuickTaskActive = false;
    // Send notification (Need to invoke 'trigger_alarm' here!)
  }
  ```

### B. Time Daemon: Browser Background Throttling vs. Rust Ticking
* **What's happening:** Currently, `startTimeDaemon()` runs a standard JavaScript `setInterval` every 1000ms inside the React runtime.
* **The potential issue:** Web browsers (including the webview running inside Tauri) aggressively throttle JavaScript timers (`setInterval`, `setTimeout`) when a window is minimized, hidden, or loses focus to save CPU/battery. This will cause your clock and countdown timer to lag or freeze if the widget goes into the background!
* **Recommendation:** As you noted in your source comments, ticking the timer from the **Rust Backend** using Tauri's event emission system is much more robust:
  - Rust can run a lightweight background thread (e.g., using `tokio` or a standard thread loop) that emits a `"tick"` event every second.
  - Your React frontend can simply listen to this native event:
    ```typescript
    import { listen } from "@tauri-apps/api/event";

    useEffect(() => {
      const unlistenPromise = listen("time-tick", (event) => {
        const now = new Date(event.payload as string);
        processTimeTick(now);
        processQuickTaskTick(now);
      });
      return () => {
        unlistenPromise.then(unlisten => unlisten());
      };
    }, []);
    ```

### C. Missing `setInterval` Cleanup in the React Hook
* **What's happening:** In `App.tsx`, you call `startTimeDaemon()` on mount:
  ```typescript
  useEffect(() => {
    startTimeDaemon();
  }, []);
  ```
* **The issue:** If the component unmounts and remounts (for instance, during HMR in development or under React Strict Mode), `isDaemonRunning` blocks starting a second interval, but the *existing* interval is never cleared or cleaned up.
* **Recommendation:** Even if `startTimeDaemon` remains a frontend daemon for now, return a cleanup function from your effect or expose a `stopTimeDaemon` function that clears the interval.

---

## 🛠️ 3. Concrete Recommendations & How-To Guides

### How to Hook Up the Native Rust Alarm Notification
Install the Tauri API package (if you haven't already or import it directly) and use `invoke`:

1. Update `src/state/quickTaskActions.ts`:
   ```typescript
   import { invoke } from "@tauri-apps/api/core";
   import { useAppStore } from "../state/useAppStore";

   export const processQuickTaskTick = async (now: Date) => {
     const currentState = useAppStore.getState();

     let isQuickTaskActive = currentState.isQuickTaskActive;
     if (isQuickTaskActive && currentState.quickTaskEnd != null && now >= currentState.quickTaskEnd) {
       isQuickTaskActive = false;

       // Trigger the Rust backend native notification!
       try {
         await invoke("trigger_alarm", { task: currentState.quickTaskName || "Quick Task" });
       } catch (err) {
         console.error("Failed to trigger native notification:", err);
       }
     }

     useAppStore.setState({
       isQuickTaskActive: isQuickTaskActive,
     });
   };
   ```

### How to Persist Settings (Save on Restart)
To make settings (like your theme color, active task, etc.) rememberable across restarts:
Using Zustand's built-in `persist` middleware is incredibly easy and leverages `localStorage` automatically under the hood:

1. Update `src/state/useAppStore.ts` to wrap your slices with `persist`:
   ```typescript
   import { create } from "zustand";
   import { persist } from "zustand/middleware";
   import { AppStore } from "../models/store.types";
   import { createTimeSlice } from "./slices/TimeSlice";
   import { createUiSlice } from "./slices/UiSlice";
   import { createSettingsSlice } from "./slices/SettingsSlice";

   export const useAppStore = create<AppStore>()(
     persist(
       (...a) => ({
         ...createTimeSlice(...a),
         ...createUiSlice(...a),
         ...createSettingsSlice(...a),
       }),
       {
         name: "pulse-storage", // local storage key
         partialize: (state) => ({
           // Only persist settings and not temporary UI or live-ticking time state!
           isBeeperActive: state.isBeeperActive,
           beeperInterval: state.beeperInterval,
           dayStart: state.dayStart,
           dayEnd: state.dayEnd,
           themeColor: state.themeColor,
           scale: state.scale,
           opacity: state.opacity,
         }),
       }
     )
   );
   ```

### Transparent & Always-on-Top Window in Tauri
For a desktop widget, you want it to float seamlessly over other windows without standard window borders.
Update your `src-tauri/tauri.conf.json` window settings:

```json
"app": {
  "windows": [
    {
      "title": "Pulse",
      "width": 300,
      "height": 300,
      "decorations": false,
      "transparent": true,
      "alwaysOnTop": true,
      "resizable": false,
      "fullscreen": false
    }
  ]
}
```
*Note: Make sure your CSS has `bg-transparent` or `bg-black/0` for the root document elements to allow the background window transparency to shine through.*

---

## 🚀 Next Steps to Build Out
1. **Complete the Beeper Screen (`Beeper.tsx`):** Change the placeholder `<div>hey</div>` to a beautiful interface allowing users to toggle auditory cues (e.g., sound every 15, 30, or 60 minutes).
2. **Setup Vitest/Jest for `src/utils/timeLogic.ts`:** Since your time calculations (`calculateDayProgress`, `calculateEndTime`) are pure, adding automated tests will make your code bulletproof and teach you standard testing practices.
3. **Rust Audio Integration:** Use lightweight Rust audio crates like `rodio` to play customizable focus audio, keeping CPU and memory overhead practically zero compared to playing audio in the browser.

Keep up the incredible work! You've set up a professional foundation that most developers take years to learn. Enjoy the process of bringing **Pulse** to life! 🎨⚙️
