import React from "react";

const students = [
    { id: 1, name: "jiyeong" },
    { id: 2, name: "junyeong" },
    { id: 3, name: "jihyun" },
    { id: 4, name: "soonhyeok" },
];

function AttendanceBook(props) {
    return (
        <ul>
            {students.map((student, index) => {
                // return <li key={student.id}> {student.name}</li>;
                return <li key={`student-id-${student.id}`}>{student.name}</li>;
                // return <li key={index}>{student.name}</li>; //인덱스를 키로 사용
            })}
        </ul>
    );
}

export default AttendanceBook;