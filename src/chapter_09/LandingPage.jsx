import React, {useState} from "react";
import Toolbar from "./Toolbar";

function LandingPage(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onClickLogin = () => setIsLoggedIn(true);
    const onClickLogout = () => setIsLoggedIn(false);

    return (
        <div>
            {/*객체로 넘김(개별 매개변수로 넘기면 받는 쪽에서도 신경써야하기 때문에 props로 한번에 전달)*/}
            <Toolbar
                isLoggedIn = {isLoggedIn}
                onClickLogin = {onClickLogin}
                onClickLogout = {onClickLogout}
            />
            <div style={{padding:16}}>리액트 공부</div>
        </div>
    );
}

export default LandingPage;