import { useNavigate } from 'react-router-dom';
import App from '../App'
import Button from 'react-bootstrap/Button';
export function Product(props){
  const navigate = useNavigate();
  return(
    <div key={props.index} className='col-md'>            
      <img src={`https://codingapple1.github.io/shop/shoes${props.id + 1}.jpg`} width="70%"/>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <h4>Price : {props.price}</h4>
        <Button variant="warning" size='sm' onClick={()=>{navigate(`/detail/${props.id}`)}}>
        상세보기
        </Button>
    </div>
  )
}