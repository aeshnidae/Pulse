import "./App.css";
import { useEffect } from "react";

// State and context
import { startTimeDaemon } from "./core/timeDaemon";

// UI
import { ClockFace } from "./components/ClockFace";
import { ProgressCircle } from "./components/ProgressCircle";

export default function App() {
  // Turn on the timeDaemon
  useEffect(() => {
    startTimeDaemon();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image is here just to test the widget in a browser with some background view. */}
      <img
        src="./src/assets/backdropTest.webp"
        alt=""
        className="fixed inset-0 w-screen h-screen object-cover pointer-events-none z-[-1]"
      />

      <div className="relative flex items-center justify-center">
        <ClockFace />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <ProgressCircle />
        </div>
      </div>
    </div>
  );
}
