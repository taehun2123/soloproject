import styles from '../User.module.css'
export function User(props){
  return(
    <div key={props.index}>
      <div className={styles.col}>
        {props.image==null ? 
        <img src="http://www.hanawaterjet.com/app/dubu_board/docs/imgs/n/lg_n15287811543531_%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC%EC%A4%80%EB%B9%84%EC%A4%91%EC%9E%85%EB%8B%88%EB%8B%A4.jpg" alt="이미지를 찾을 수 없음" width="250px"/> 
        : <img src={`http://localhost:8080/${props.image}`} alt="이미지" width="250px" height="250px" />}
        <h3>{props.name}</h3>
        <p>설명 : {props.content}</p>
        <h4>가격 : {props.price}원</h4>
        <div className={styles.btnrow}>
        <button onClick={props.admin === 1 ? ()=>props.selectedAdminList(props.index) : ()=>props.selectList(props.index)} className="button">{props.admin === 1 ? "수정하기" : "선택하기"}</button>
        {props.admin === 1 ? <button className="button" onClick={()=>{props.deleteList(props.id)}}>X</button> : null}
        </div> 
      </div>
    </div>
  )
}