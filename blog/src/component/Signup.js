import { useState } from 'react'

export function Signup(props){
  const [signupId, setSignupId] = useState("");
  const [signupPw, setSignupPw] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupBirth, setSignupBirth] = useState("");

  async function checkId(){
    const checkedID = {
      id : signupId,
    }
    const chainLogin = await fetch("https://port-0-blogserver-3prof2llkshu36z.sel4.cloudtype.app/checkedid", {
      method : 'POST',
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(checkedID),
    })
    const result = await chainLogin.json();
    alert(result.message);
    if(result.success) {
      submitForm();
  }
}
  async function submitForm(){
    const newData = {
      id : signupId,
      pw : signupPw,
      name : signupName,
      birth: signupBirth,
    }
    const chainLogin = await fetch("https://port-0-blogserver-3prof2llkshu36z.sel4.cloudtype.app/signup", {
      method : 'POST',
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(newData),
    })
    alert("회원가입이 완료되었습니다!")
    props.navigate("/login")
}
  return(
    <div>
      <h2>회원가입</h2>
      <br/><hr/><br/>
      <form>
        <label>
          <input placeholder="아이디" onChange={(e)=>{setSignupId(e.target.value)}}/>
        </label><br/>
        <label>
          <input type="password" placeholder="비밀번호" onChange={(e)=>{setSignupPw(e.target.value)}}/>
        </label><br/>
        <label>
          <input placeholder="이름" onChange={(e)=>{setSignupName(e.target.value)}}/>
        </label><br/>
        <label>
        <input maxLength={8} placeholder="생년월일 8자리" onChange={(e)=>{setSignupBirth(e.target.value)}} type='text'/>
        </label>
      </form>
      <br/>
      <button onClick={()=>{checkId()}}>회원가입 완료</button>
    </div>
  )
}