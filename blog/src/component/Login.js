import { useEffect, useState } from 'react'

export function Login(props){
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const storedUser = JSON.parse(localStorage.getItem('user'));

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
      const chainLogin = await fetch("http://localhost:5050/login", {
        method : 'POST',
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(newLogin),
      })
      const result = await chainLogin.json();
      alert(result.message);
      if(result.success) {
      localStorage.setItem('user', JSON.stringify(newLogin));
      props.setInLogin(true);
      props.navigate("/");
      setLoginId("");
      setLoginPw("");
    } else {
      alert("아이디와 비밀번호를 입력하세요!")
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
      <h2>로그인</h2>
      <br/><hr/><br/>
        <label><input onChange={(e)=>setLoginId(e.target.value)} placeholder='ID를 입력하세요'/></label><br/>
        <label><input type='password' onChange={(e)=>setLoginPw(e.target.value)} placeholder='PW를 입력하세요'/></label><br/><br/>
        <button onClick={()=>{loginSubmit()}}>Login</button>&nbsp;<button onClick={()=>{signupSubmit()}}>Sign up</button>
    </div>
  )
}