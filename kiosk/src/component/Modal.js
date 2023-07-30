import {Cart} from './Cart'
export function Modal(props){
  return(
    <div className="modal">
      <div className='carttitle'>
        <div className='carttitle-list'>
          <h3>카트 목록</h3>
        </div>
        <div className='carttitle-x'>
          <button className='button' onClick={()=>{props.setShowcart(false)}}>X</button>
        </div>
      </div>  
      <ul className='modal-container'>
        {props.cartList.map((item, index)=>(
          <Cart cartList={props.cartList} id={item.id} name={item.name} content={item.content} price={item.price} index={index} deleteCart={props.deleteCart} cnt={item.cnt}/>
        ))}
      </ul>
    </div> 
  )
}