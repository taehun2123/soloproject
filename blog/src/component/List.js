import styles from '../List.module.css'
export function List(props) {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  function loginWrite(){
    if(props.inLogin===true){
      props.navigate("/write");
    } else {
      alert("로그인 후 이용 가능합니다.");
      props.navigate("/login");
    }
  }
  return(
    <>
    <ul className={styles.list}>
    <div className={styles.list_menu}>
      <h2>LIST</h2>
      <button onClick={()=>{loginWrite()}}>글 작성</button>
    </div>
    {props.datafile ? props.datafile.map((item, index) => (
      <li className={styles.list_text} key={index}>
        <div className={styles.list_hb}>
          <h4>{item.title}</h4>
            {storedUser && item.log == storedUser.id 
            ? <><button onClick={()=>{
              props.selectedPost(index)
              }}>Edit</button>
              <button onClick={()=>{props.deletePost(item.id)}}>X</button>
              </>
              : null}
        </div>
        <p>{item.content}</p>
        <p>발행일 : {item.time}</p>
      </li>
    ))
    : '로딩중'}
  </ul>
  </>
  )
}