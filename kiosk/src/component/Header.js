import '../App.css'
import styles from '../Header.module.css'
export function Header(props){
  return(
    <div>
      <div className={styles.main}>
        <div className={styles.title}>
          <h2 onClick={()=>{props.navigate("/user/1")}}>Hoon's Kiosk</h2>
        </div>
        <div className={styles.cart}>
          <h2 onClick={()=>{props.setShowcart(!props.showCart)}}>Cart</h2>
        </div>
      </div>
    </div>
  )
}