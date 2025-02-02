import React from "react";
import Notification from "./Notification";

const reservedNotifications = [
    { message: "Hello, I will tell you today's schedule." },
    { message: "Today's schedule is as follows." },
    { message: "2. Lunch at 12:00 PM" },
    { message: "3. Meeting with the client at 2:00 PM" }
];

var timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { // 생성자에서 앞으로 사용할 데이터를 State(리액트 컴포넌트의 변경 가능한 데이터를 의미, 자바스트리브 객체)에 넣어 초기화
            notifications: [],
        };
    }

    componentDidMount() {
        const { notifications } = this.state;
        timer = setInterval(() => { // 1초마다 정해진 작업 수행
            if (notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index]);
                this.setState({
                    notifications: notifications,
                }); // STATE를 업데이트 하기 위해서 setState 사용
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    render() {
        return (
            <div>
                {this.state.notifications.map((notification) => {
                    return <Notification message={notification.message} />
                })}
            </div>
        );
    }
}
export default NotificationList;

