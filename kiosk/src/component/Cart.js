import styles from '../Cart.module.css'
export function Cart(props){
  return(
    <div key={props.index}>
      <li key={props.index} className={styles.modal}>
        {props.image==null ? 
        <img src="http://www.hanawaterjet.com/app/dubu_board/docs/imgs/n/lg_n15287811543531_%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC%EC%A4%80%EB%B9%84%EC%A4%91%EC%9E%85%EB%8B%88%EB%8B%A4.jpg" width="110px"/> 
        : <img src={`http://localhost:8080/${props.image}`} width="110px"/>}
        <h3>{props.name}</h3>
        <h4>개수 : {props.cnt}</h4>
        <h4>설명 : {props.content}</h4>
        <h4>가격 : {props.price}원</h4>
        <button className="button" onClick={()=>{props.deleteCart(props.id)}}>X</button>
      </li>
    </div>
  )
}