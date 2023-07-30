import { useState } from 'react'
import styles from './../Login.module.css'
export function Login(props){
  const [password, setPassword] = useState("");
  function Loginbtn(){
    if(password==="adminpw"){
      props.setAdmin(1);
      alert("로그인 되었습니다.");
      props.navigate("/admin");
    } else {
      alert("비밀번호가 일치하지 않습니다! (관리자만 이용가능 합니다)")
    }
  }
  return(
    <div className={styles.background}>
      <div className={styles.loginForm}>
        <h1>ADMIN</h1>
        <label><input 
        onChange={(e)=>{setPassword(e.target.value)}}
        maxLength={8}
        type="password"
        placeholder='관리자 비밀번호'/></label>
          <div>
            <button className={styles.button} onClick={()=>{Loginbtn()}}>Login</button>
          </div>
      </div>
    </div>
  )
}