export function Logout(props){
  const handleLogout = async () => {
    localStorage.removeItem('user');
    props.setInLogin(false);
    props.navigate("/")
  };
  return(
    <div>
      <h1>정말 로그아웃 하시겠습니까?</h1><br/><hr/><br/>
      <button onClick={()=>{handleLogout()}}>로그아웃</button>
    </div>
  )
}