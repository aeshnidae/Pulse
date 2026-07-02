import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    else if (seconds === 0 && isRunning) {
      setIsRunning(false);
      invoke("trigger_alarm", { task: "Wash Dishes" })
        .catch((err) => console.error("Failed to notify backend", err));
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const handleCircleClick = () => {
    if (seconds === 0) {
      setSeconds(5);
    }
    setIsRunning(!isRunning);
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 gap-6">
      
      {/* Instead of 'div' we use 'motion.div' to unlock animation attributes */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        onClick={handleCircleClick}
        className="w-64 h-64 bg-gray-400 rounded-full shadow-lg border-4 border-gray-500 relative flex items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
      >
        <div className="text-4xl font-mono fond-bold text-zinc-900 select-none">
          {seconds}s
        </div>
      </motion.div>

      <div className="text-zinc-400 font-medium">
        {seconds === 0 ? "Task Triggered!" : isRunning ? "Counting down..." : "Click circle to start"}
      </div>

    </div>
  );
}