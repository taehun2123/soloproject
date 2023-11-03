import { useState } from 'react'
import styles from './Signup.module.css'
export function Signup(props){
  const [signupId, setSignupId] = useState("");
  const [signupPw, setSignupPw] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");

  async function checkId(){
    if(signupId && signupPw && signupName && signupEmail != ""){
    const chainLogin = await fetch(`http://localhost:5050/signUp/${signupId}`, {
      method : 'GET',
    })
    const result = await chainLogin.json();
    alert(result.message);
    if(result.success) {
      submitForm();
    }
  } else {
    alert("미 작성된 가입란이 있습니다. 확인해주세요!");
  }
}
  async function submitForm(){
    const newData = {
      userId : signupId,
      userPassword : signupPw,
      name : signupName,
      email: signupEmail,
    }
    const submit = await fetch("http://localhost:5050/users", {
      method : 'POST',
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(newData),
    })
    const result = await submit.json();
    alert(result.message);
    if(result.success) {
      props.navigate("/login");
    }
}
  return(
    <div>
      <div className={styles.loginContainer}>
        <h2>회원가입</h2>
        <div className={styles.loginForm}>
          <label>
            <input
            className={styles.input}
            placeholder="아이디" 
            onChange={(e)=>{setSignupId(e.target.value)}}
            />
          </label>
          <label>
            <input 
            className={styles.input}
            type="password" 
            placeholder="비밀번호" 
            onChange={(e)=>{setSignupPw(e.target.value)}}
            />
          </label>
          <label>
            <input 
            className={styles.input}
            placeholder="이름" 
            onChange={(e)=>{setSignupName(e.target.value)}}
            />
          </label>
          <label>
            <input 
            className={styles.input}
            placeholder="이메일" 
            onChange={(e)=>{setSignupEmail(e.target.value)}} 
            type='email'
            />
          </label>
        </div>
        <button 
        onClick={()=>{checkId()}}
        className={styles.button}
        >
        회원가입 완료
        </button>
      </div>
    </div>
  )
}