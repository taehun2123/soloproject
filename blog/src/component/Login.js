import { useEffect, useState } from 'react'
import styles from './Login.module.css';

export function Login(props){
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const storedUser = JSON.parse(sessionStorage.getItem('user'));

  useEffect(()=>{
    if (storedUser) {
      props.setInLogin(true);
    }
  }, []);

  async function loginSubmit(){
    if(loginId && loginPw !== null){
    const newLogin = {
      id : loginId,
      pw : loginPw,
    }
      const chainLogin = await fetch("https://port-0-blogserver-3prof2llkshu36z.sel4.cloudtype.app/login", {
        method : 'POST',
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(newLogin),
      })
      const result = await chainLogin.json();
      alert(result.message);
      if(result.success) {
      sessionStorage.setItem('user', JSON.stringify(newLogin));
      props.setInLogin(true);
      props.navigate("/");
      setLoginId("");
      setLoginPw("");
      }
    }
  }

  function signupSubmit(){
    if(props.inLogin===false){
      props.navigate("/signup")
    } else {
      alert("이미 로그인 되어 있잖아요.")
    }
  }  
  return(
    <div>
      <div className={styles.loginContainer}>
        <h2>로그인</h2>
        <div className={styles.loginForm}>
          <label>
            <input 
            className={styles.input} 
            onChange={(e)=>setLoginId(e.target.value)}
            placeholder='ID를 입력하세요'
            />
          </label>
          <label>
            <input
            className={styles.input} 
            type='password' 
            onChange={(e)=>setLoginPw(e.target.value)} 
            placeholder='PW를 입력하세요'
            />
          </label>
        </div>
        <div className={styles.buttonBox}>
          <button 
          className={styles.button}
          onClick={()=>{loginSubmit()}}
          >
            Login
          </button>
          &nbsp;
          <button 
          className={styles.button}
          onClick={()=>{signupSubmit()}}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}