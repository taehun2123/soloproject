import styles from './List.module.css'
export function List(props) {
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  function loginWrite(){
    if(props.inLogin){
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
      <h2 style={{fontWeight: '650'}}>방명록 LIST</h2>
      <button 
      className={styles.button}
      onClick={()=>{loginWrite()}}
      >글 작성</button>
    </div>
    {props.datafile 
    ? props.datafile.map((item, index) => (
      <div className={styles.list_text} key={index}>
        <div className={styles.list_hb}>
          <h4 style={{display: "flex", textAlign: "center"}}>{item.title}</h4>
            {(storedUser && (item.log == storedUser.userId)) 
            && <>
              <button
              className={styles.button} 
              onClick={()=>{
              props.selectedPost(index)
              }}>
                수정
              </button>
              <button
              onClick={()=>{props.deletePost(item.id)}}
              className={styles.button} 
              style={{backgroundColor: "#CC0000", border:"none"}}
              >
                삭제
              </button>
              </>
              }
        </div>
        <p>{item.content}</p>
        <p>발행일 : {item.date}</p>
      </div>
    ))
    : '로딩중 입니다..'}
  </ul>
  </>
  )
}