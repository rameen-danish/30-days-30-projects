"use client";

//import statements
import { useState , useRef , useEffect , ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; 

export default function Countdown(){
// state and reference
const [duration , setDuration] = useState < number | string >("");
const [timeLeft , setTimeLeft] = useState < number >(0);
const [isActive , setIsActive] = useState < boolean >(false);
const [isPaused , setIsPaused] = useState < boolean >(false);
const timerRef = useRef <NodeJS.Timeout | null >(null);

//function for timer control
const handleSetDuration = () : void =>{
    if(typeof duration == 'number' && duration > 0){
        setTimeLeft(duration);
        setIsActive(false);
        setIsPaused(false);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    }
};

const handleStart = () : void => {
    if(timeLeft > 0){
        setIsActive(true);
        setIsPaused(false);
    }
}

const handlePaused = () : void => {
    if(isActive){
        setIsPaused(true);
        setIsActive(false);
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }
}

const handleReset = () : void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === 'number' ? duration : 0);
    if(timerRef.current){
        clearInterval(timerRef.current)
    }
}

//useEffect for countdown logic
useEffect(()=>{
    if(isActive && !isPaused){
        timerRef.current = setInterval(()=>{
            setTimeLeft((prevTime)=>{
                if(prevTime <= 1){
                    clearInterval(timerRef.current!);
                    return 0 ;
                }
                return prevTime - 1;
            });
        },1000);
    }
    return ()=>{
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }
}, [isActive,isPaused]);

//Helper function
const formatTime = (time:number):string => {
    const minutes = Math.floor(time/60);
    const seconds = time%60;
    return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
}

const handleDurationChange = (e : ChangeEvent<HTMLInputElement>):void => {
    setDuration(Number(e.target.value)|| "");
}
return(
    <div className="title">
        <h1>Count down Timer made by Rameen Danish</h1>
         {/* Container div for centering the content */}
    <div className="outer-box">
      {/* Timer box container */}
      <div className="inner-box">
        {/* Title of the countdown timer */}
        <h1 className="heading">
          Countdown Timer
        </h1>
        {/* Input and set button container */}
        <div className="input-set-container">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in sec"
            value={duration}
            onChange={handleDurationChange}
            className="input"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="set-button"
          >
            Set
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="formatted-time">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="start-pause-reset-button">
          <Button
            onClick={handleStart}
            variant="outline"
            className="start-resume"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePaused}
            variant="outline"
            className="pause"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="reset"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
    </div>
);
}
