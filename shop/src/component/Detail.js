import { useParams } from 'react-router-dom';
import App from '../App'
import Button from 'react-bootstrap/Button';
export function Detail (props){
  let {id} = useParams();
  const findid = props.list.find((item)=>(item.id==id)); //비교연산자 ===(값과 타입까지 확인)와 ==(값만 확인)주의하여 사용
  if (!findid) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }
  return(
    <div>
      <div className='detail'>            
        <img className="detail-img" src={`https://codingapple1.github.io/shop/shoes${findid.id+1}.jpg`} width="300px"/>
        <div className='detail-text'>
        <h3>{findid.name}</h3>
        <p>{findid.description}</p>
        <h4>Price : {findid.price}원</h4>
        <Button variant="warning" size='sm'>
        주문하기
        </Button>&nbsp;
        <Button variant="danger" size='sm'>
        장바구니 담기
        </Button>
        </div>
    </div>
    </div>
  )
}