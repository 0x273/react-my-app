import React, {useState, useEffect} from "react";
import useCounter from "./useCounter";

const MAX_CAPACITY = 10;
const initialValue = 0;

function Accommodate(props) {
    const [isDisable, setIsDisable] = useState(false);
    const [count, increaseCount, decreaseCount] = useCounter(initialValue);

    /*const [count,setCount] = useState(initialValue);

    const increaseCount = () => setCount((count) => count + 1);
    const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));*/

    // 의존성 배열이 아예 존재하지 않을 경우 렌더링마다 실행됨
    useEffect(() => {
        console.log("===================");
        console.log("useEffect() is called.");
        console.log(`isDisable: ${isDisable}`);
    });

    useEffect(() => {
        setIsDisable(count >= MAX_CAPACITY || count === 0); // true(count >= MAX_CAPACITY 결과는 항상 ture/false를 반환)
        console.log(`Current count value: ${count}`);
    }, [count]);

    return (
        <div style={{padding: 16}}>
            <p>{`총 ${count}명 수용했습니다.`}</p>

            <button onClick={increaseCount} disabled={count >= MAX_CAPACITY}>입장</button>
            <button onClick={decreaseCount} disabled={count === 0}>퇴장</button>

            {count >= MAX_CAPACITY && <p style={{color: "red"}}>정원이 가득찼습니다.</p>}
            {count === 0 && <p style={{color: "blue"}}>비어있습니다.</p>}
        </div>
    );
}

export default Accommodate;