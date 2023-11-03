import styles from './Logout.module.css'
export function Logout(props){
  const handleLogout = async () => {
    if(sessionStorage.getItem('user')){
      const chainLogout = await fetch(`http://localhost:5050/logout`, {
        method: 'GET',
      })
      const result = await chainLogout.json();
      alert(result.message);
      if(result.success) {
        sessionStorage.removeItem('user');
        props.setInLogin(false);
        props.navigate("/")
      }
    }
  };
  return(
    <div>
      <h1>정말 로그아웃 하시겠습니까?</h1><br/><hr/><br/>
      <button 
      className={styles.button}
      onClick={()=>{handleLogout()}}
      >로그아웃</button>
    </div>
  )
}