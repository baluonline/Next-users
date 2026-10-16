import { useEffect, useState } from "react";

export default function Counter() {
    const [counter, setCounter] = useState(0);
    const [stopCounter, setStopCounter] = useState(false);
    useEffect(() => {
        if (!stopCounter) return;
        const intervalId = setInterval(() => {
            setCounter((value) => value + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [stopCounter]);

    return (
        <div className={`flex flex-row gap-2 my-4`}>
            <button
                className={`bg-primary`}
                onClick={() => setStopCounter(true)}
            >
                Start
            </button>
            <p> Counter value <strong>{counter}</strong></p>
            <button
                className={`bg-primary`}
                onClick={() => setStopCounter(false)}
            >
                Stop
            </button>
        </div>
    );
}
