import { useParams } from 'react-router-dom';
import App from '../App'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useEffect, useState } from 'react';
export function Detail (props){
  const [num, setNum] = useState("");
  const [time,setTime] = useState(0);
  const [tab, setTab] = useState(0);

  useEffect(()=>{
    let timea = setTimeout( ()=>{setTime(1)},2000);
    return ()=>{
      clearTimeout(timea)
    }
  }, [])


  let {id} = useParams();
  const findid = props.list.find((item)=>(item.id==id)); //비교연산자 ===(값과 타입까지 확인)와 ==(값만 확인)주의하여 사용
  if (!findid) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }
  function maxLengthCheck(e) { 
    const target = e.target; 
    //target.value.length = input에서 받은 value의 길이 
    //target.maxLength = 제한 길이 

    if (target.value.length > target.maxLength) { 
        target.value = target.value.slice(0, target.maxLength); 
    } 
} 
  return(
    <div>
      {time === 0 ? <div className='hurry-up'>
        2초 이내 구매 시 할인
      </div> : null}       
      <div className='detail-m'>  
        <img className="detail-img" src={`https://codingapple1.github.io/shop/shoes${findid.id+1}.jpg`} width="500px"/>
        <div className='detail-text'>
          <h3>{findid.title}</h3>
          <p><label>수량 : 
            <input onChange={(e)=>{maxLengthCheck(e)}} type='number' placeholder='숫자만 입력하세요' minLength={1} maxLength={2} min={0} max={99}/></label></p>
          <p>{findid.content}</p>
          <h4>Price : {findid.price}원</h4>
          <Button variant="warning" size='sm'>
          주문하기
          </Button>&nbsp;
          <Button variant="danger" size='sm'>
          장바구니 담기
          </Button>
        </div>
      </div>
      {/* 탭UI */}
      <div className='detail-tab'>
        <Nav fill variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={()=>setTab(0)}>상품 설명</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={()=>setTab(1)}>상품 상세</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={()=>setTab(2)}>리뷰</Nav.Link>
          </Nav.Item>
        </Nav>
        {/* Nav탭에 따른 내용 달리 표시 */}
        {tab==0 ? <div>0</div> : null }
        {tab==1 ? <div>1</div> : null }
        {tab==2 ? <div>2</div> : null }
      </div>
    </div>
  )
}