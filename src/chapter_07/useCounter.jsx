import React, { useState} from "react";
import Accommodate from "./Accommodate";

function useCounter(props){
    const [count,setCount] = useState(0);

    const increaseCount = () => setCount((count) => count + 1);
    const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));

    return [count, increaseCount, decreaseCount];
}

export default useCounter;