import './App.css';
import { data } from './component/data';
import { Header } from './component/Header';
import { Product } from './component/Product';
import { About } from './component/About';
import { Event } from './component/Event';
import { Detail } from './component/Detail'
import { Cart } from './component/Cart';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';

function App() {
  const [List,setList] = useState(data);
  const [clickedGet, setclickedGet] = useState(2);

  function sortList() {
    const temp = [...List];
    temp.sort((a,b) => a.title.localeCompare(b.title));
    setList(temp);
  }

  function Getpost(){
    fetch(`https://codingapple1.github.io/shop/data${clickedGet}.json`)
    .then(res=>res.json())
    .then(data=>{
      const temp = [...List, ...data];
      setList(temp)
      setclickedGet(clickedGet+1);
    })
  }
  return (
    <div className="App">
      <Header/>
      <br />
      <Routes>
        <Route path="/" element={
          <>
          <div className='bg'>
            <div className='main-bg'>배너</div>
            <div className='main-bg'>배너</div>
          </div>
          <hr/>
          <h1>베스트 TOP 3</h1>
          <p>가장 인기많은 TOP 3를 만나보세요.</p>
          <div className='sortmenu'>
            <Button variant="danger" size='sm' onClick={()=>{sortList()}}>
            이름순 정렬하기
            </Button>
          </div>
          <div className='container'>
            <div className='row'>
              {List.map((item,index)=>(
              <Product index={index} id={item.id} name={item.title} price={item.price} description={item.content}/>
              ))}
            </div>
          </div>
            <br/>
            {clickedGet<=3 ? <Button variant="danger" size='sm' onClick={()=>{Getpost()}}>
            더보기
            </Button> : null}
          </>
        }/>
        <Route path='/product' element={
          <>
            {List.map((item,index)=>(
            <Product index={index} id={item.id} name={item.title} price={item.price} description={item.content}/>
            ))}
          </>
        } />
        <Route path='*' element={<div>ERROR! 없는 페이지입니다.</div>}/>
        <Route path='/about' element={<About/>}>
          <Route path="member" element={<div>멤버(유사한 페이지서 생성)</div>}/>
        </Route>
        <Route path='/event' element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 <span className='plus-one'>"하나 더"</span> 드립니다!</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>
        <Route path='/detail/:id' element={      
        <div className='container'>
          <div className='row'>
            <Detail list={List}/>
          </div>
        </div>
        }/>
        <Route path='/cart' element={
          <Cart/>
        }/>
      </Routes>
    </div>
  );
}
export default App;
