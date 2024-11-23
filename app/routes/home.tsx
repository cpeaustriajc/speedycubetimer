import { useState, useEffect, useRef } from "react";
import { randomScrambleForEvent } from "cubing/scramble";
import { Button } from "react-aria-components";

type Time = {
  time: number;
  id: number;
};

const Home = () => {
  const [scramble, setScramble] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [times, setTimes] = useState<Time[]>([]);

  const timeRef = useRef<number>(0);
  const intervalIdRef = useRef<number | undefined>(undefined);

  timeRef.current = time;

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === " ") {
      if (isRunning) {
        setTimes([
          ...times,
          { time: timeRef.current, id: Math.floor(Math.random() * 1000) },
        ]);
        reset();
      } else {
        setKeyPressed(false);
        setIsRunning(true);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === " ") {
      if (!isRunning) {
        setKeyPressed(true);
      }
    }
  };

  useEffect(() => {
    getScramble();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
    } else if (intervalIdRef.current) {
      window.clearInterval(intervalIdRef.current);
    }
  }, [isRunning]);

  const getScramble = async () => {
    const scramble = await randomScrambleForEvent("333");
    setScramble(scramble.toString());
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const milliseconds = Math.floor((timeInSeconds % 1) * 100);

    const parts = [];

    if (hours > 0) {
      parts.push(hours.toString().padStart(2, "0"));
    }

    if (hours > 0 || minutes > 0) {
      parts.push(minutes.toString().padStart(2, "0"));
    }

    parts.push(seconds.toString().padStart(2, "0"));
    parts.push(milliseconds.toString().padStart(2, "0"));

    if (parts.length > 2) {
      return `${parts.slice(0, -2).join(":")}:${parts.slice(-2).join(".")}`;
    } else {
      return parts.join(".");
    }
  };

  function reset() {
    setIsRunning(false);
    setTime(0);
  }

  const computeAverageOf5 = () => {
    if (times.length < 5) {
      return null;
    }

    const last5 = times.slice(-5);
    const sorted = last5.slice().sort((a, b) => a.time - b.time);
    sorted.pop();
    sorted.shift();

    return sorted.reduce((a, b) => a + b.time, 0) / 3;
  };

  return (
    <div
      className={`h-dvh flex flex-col justify-center items-center ${
        isRunning ? "bg-green-400" : ""
      } ${keyPressed ? "bg-yellow-400" : ""}`}
    >
      <pre className="text-9xl">{formatTime(time)}</pre>
      <p>{scramble}</p>
      <h2>Times</h2>
      <table className="table-auto">
        <thead>
          <tr className="flex gap-2">
            <th>Time</th>
            <th>Average of 5</th>
          </tr>
        </thead>
        <tbody>
          {times.map((time, index) => (
            <tr key={index}>
              <td>{formatTime(time.time)}</td>
              <td>
                {times.length >= 5 && index >= times.length - 5
                  ? formatTime(computeAverageOf5()!)
                  : "-"}
              </td>
              <td>
                <Button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-red-400 transition-colors bg-red-200 text-red-900 data-[hovered]:bg-red-400/90 h-10 px-4 py-2"
                  onPress={() => {
                    setTimes(times.filter((t) => t.id !== time.id));
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;