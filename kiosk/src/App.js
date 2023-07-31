import './App.css';
import {Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { Header } from './component/Header'
import { User } from './component/User';
import { Admin } from './component/Admin';
import { Tab } from './component/Tab';
import { Modal } from './component/Modal';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);

  const [addName, setAddName] = useState("");
  const [addContent, setAddContent] = useState("");
  const [addPrice, setAddPrice] = useState("");
  // const [filename, setFilename] = useState("");

  const [admin,setAdmin] = useState(0);
  const [eIndex, setIndex] = useState(null);
  const [showCart, setShowcart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
  // 상품과 카트목록 렌더링마다 불러오기
  useEffect(()=>{
    loadList();
    getCart();
  }, [])
    function loadList(){
    fetch("http://localhost:8080/list")
    .then(res=>res.json())
    .then((data)=>
      setData(data)
    )
  }
// 카트 목록 불러오기
  function getCart(){
    fetch("http://localhost:8080/cart")
    .then(res=>res.json())
    .then((data)=>
      setCartList(data)
    )
  }
// 장바구니 담기
  async function selectList(index){
    const selectedData = {
      id : data[index].id,
    }
    const loadList = await fetch("http://localhost:8080/cartInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedData),
    })
    setShowcart(true);
    getCart();
  }
// 카트에 있는 선택 품목 삭제하기
  async function deleteCart(id){
    const loadData = await fetch(`http://localhost:8080/cartDelete/${id}`,{
      method: 'DELETE',
    });
    alert("장바구니에서 품목이 삭제되었습니다")
    getCart();
  }

// 관리자용
function selectedAdminList(index){  //index 값을 이용하여 수정 게시글 변경하는 방법
  if (admin === 1){
    navigate("/admin");
    setAdmin(2);
    setSelectedImage(data[index].image);
    setAddName(data[index].name);
    setAddContent(data[index].content);
    setAddPrice(data[index].price);
    setIndex(index);
} else {
  alert("관리자의 권한이 없으면 수정할 수 없습니다.")
}
}

// 상품 수정
async function editList(imageUrl){
  if(addName && addContent && addPrice !== ""){
    if(admin === 2){
    const updatedData = {
      id: data[eIndex].id, // 게시물 식별자 (예: 게시물의 고유 ID)
      image : imageUrl,
      name: addName,
      content: addContent,
      price: addPrice,
    };
    const loadData = await fetch("http://localhost:8080/listEdit",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
    data[eIndex].name = addName;
    data[eIndex].content = addContent;
    data[eIndex].price = addPrice;
    setAddName("");
    setAddContent("");
    setAddPrice("");
    setIndex(null);
    alert("성공적으로 게시물이 수정되었습니다.");
    setAdmin(1);
    loadList();
    navigate("/user/1");
  } else {
    alert("관리자 권한이 없습니다.");
  }
  } else {
    alert("제목과 내용을 작성해주세요!"); 
  }
}

// 상품 삭제
  async function deleteList(id){
    if(admin === 1){
    const loadData = await fetch(`http://localhost:8080/listDelete/${id}`,{
      method: 'DELETE',
    });
    alert("성공적으로 상품이 삭제되었습니다")
  } else {
    alert("관리자 권한만 이용이 가능합니다")
  }
}
  //상품 이미지 업로드
  function handleUpload(){
    const formData = new FormData();
    formData.append('image', selectedImage);

    fetch('http://localhost:8080/images', {
      method : 'POST',
      body : formData
    })
      .then(res => res.json())
      .then(data => {
        console.log("이미지 업로드 성공 :", data.imageUrl);
        setSelectedImage(null);
        if(admin==2){
        editList(data.imageUrl);
      } else {
        addList(data.imageUrl);
      }
      })
  }

  //상품 추가
  async function addList(imageUrl){
    if(addName && addContent && addPrice !== ""){
    const addData = {
      image: imageUrl,
      name : addName,
      content : addContent,
      price : addPrice,
    }
    const loadList = await fetch("http://localhost:8080/listInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addData),
    })
    setAddName("");
    setAddContent("");
    setAddPrice("");
    alert("성공적으로 메뉴가 추가되었습니다.");
    loadList();
    navigate("/user/1");
    } else {
    alert("제목과 내용을 입력해주세요!"); 
  }}
  return (
    <div className="App">
      <Routes>
      {/* 관리자 페이지 */}
      <Route path="/admin" element={
        <>
          <Header navigate={navigate} setShowcart={setShowcart} showCart={showCart}/>
          <Admin handleUpload={handleUpload} selectedImage={selectedImage} setSelectedImage={setSelectedImage} setAdmin={setAdmin} admin={admin} data={data} addName={addName} addPrice={addPrice} addContent={addContent} setAddName={setAddName} setAddContent={setAddContent} setAddPrice={setAddPrice} addList={addList} editList={editList} navigate={navigate}/>
        </>
        }/>      
        {/* 지정된 path외 모든 페이지 */}
        <Route path="*" element={
          <>
          <Header navigate={navigate} setShowcart={setShowcart} showCart={showCart}/>
            <Tab navigate={navigate}/>
              <div><p>[404]준비중인 페이지</p></div>
          </>
        }/>
        {/* 유저 페이지 */}
        <Route path="/user" element={
        <>
          <Header navigate={navigate} setShowcart={setShowcart} showCart={showCart}/>
            <Tab navigate={navigate}/>
              <p>메뉴 선택 후 주문 버튼을 누르세요</p><Outlet></Outlet>
        </>}>
          {/* 유저/1 페이지 : 커피 */}
          <Route path="1" element={
            <div className='container'>
              <div className='row'>
                {data.map((item, index) => (
                  <User image={item.image} name={item.name} id={item.id} index={index} price={item.price} content={item.content} admin={admin} selectList={selectList} selectedAdminList={selectedAdminList} deleteList={deleteList}/>
                ))}
              </div>
            </div>
          }/>
          {/* 유저/2 페이지 : 아이스크림 */}
          <Route path="2" element={
            <div>2</div>
          }/>
          {/* 유저/3 페이지 : 디저트 */}
          <Route path="3" element={
            <div>3</div>
          }/>
        </Route>
      </Routes>
      {/* 선택하기 버튼 누를시 장바구니 모달 창 띄우기 */}
      {showCart === true ? <Modal cartList={cartList} setShowcart={setShowcart} deleteCart={deleteCart}/> : null}
    </div>
  );
}

export default App;
