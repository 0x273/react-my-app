import React, {useState} from "react";

function SignUp(props) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleSubmit = (event) => {
        if (gender === '') {
            alert("성별을 선택해주세요.");
            return;
        }
        // const genderString = (gender === 1) ? "남성" : "여성";

        alert(`이름 ${name}, ${gender}으로 제출되었습니다.`);
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                이름:
                <input type="text" value={name} onChange={handleChangeName}/>
            </label>
            <div>
                    {/*<label>
                        성별:
                        <input type="radio" name="gender" value="0" checked={gender === 0} onChange={handleChangeGender}/> 남성
                    </label>
                    <label>
                        <input type="radio" name="gender" value="1" checked={gender === 1} onChange={handleChangeGender}/> 여성
                    </label>*/}
                <label>
                    성별:
                    <select value={gender} onChange={handleChangeGender}>
                        <option value=''>성별선택</option>
                        <option value='남성'>남성</option>
                        <option value='여성'>여성</option>
                    </select>
                </label>
            </div>
            <button type="submit">제출</button>
        </form>
    );
}

export default SignUp;