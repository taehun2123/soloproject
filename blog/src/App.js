import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { Head } from './component/Head';
import { Write } from './component/Write';
import { useRef, useState} from 'react';

function App() {
  const [hlist, setHlist] = useState("");
  const [plist, setPlist] = useState("");
  const [data, setData] = useState([{
    title: "[고정 게시물] 공지사항",
    text: "본 페이지는 사용자의 게시물을 저장하지 않으므로 자유롭게 감정을 표출하세요",
    thumb : 0,
    time : new Date(),
  }]);
  const navigate = useNavigate();
  const idRef = useRef(1);
  const [postIndex, setPostIndex] = useState(null);


  function addPost() {
    if(hlist && plist !== ""){
    const newData = {
      id : idRef.current,
      title: hlist,
      text: plist,
      thumb : 0,
      time : new Date(),
    };
    setData([...data, newData]);
    setHlist("");
    setPlist("");
    setPostIndex(null);
    alert("성공적으로 게시물이 발행되었습니다.");
    navigate("/");
    idRef.current += 1;
  } else {
    alert("제목과 내용을 입력해주세요!"); 
  }
  }
  function recommend(id){ //id 값으로 따봉 올리는 방법
    const temp = [...data];
    const index = temp.findIndex((item)=>(item.id===id));
    temp[index].thumb += 1;
    setData(temp);
  }
  // function removePost(id){
  //   const updatedData = data.filter(item => item.id !== id);
  //   setData(updatedData);
  // }

  function selectedPost(index){  //index 값을 이용하여 수정 게시글 변경하는 방법
    navigate("/management");
    setHlist(data[index].title);
    setPlist(data[index].text);
    setPostIndex(index);
  }

  function editPost(){
    if(hlist && plist !== ""){
      data[postIndex].title = hlist;
      data[postIndex].text = plist;
      setHlist("");
      setPlist("");
      setPostIndex(null);
      alert("성공적으로 게시물이 수정되었습니다.");
      navigate("/");
    } else {
      alert("제목과 내용을 작성해주세요!"); 
    }
  }

  return (
      <div className="App">
        <Head/>
        <main>
          <Routes>
            <Route path="/" element={
              <article>
                <ul className="list">
                  {data.map((item, index) => (
                    <li className="list-text" key={index}>
                      <div className="list-hb">
                        <h2>{item.title}</h2>
                        <button onClick={()=>{
                          let copy = [...data];
                          copy.splice(index,1);
                          setData(copy);
                        }}>X</button>
                        <button onClick={()=>{selectedPost(index)}}>
                          Edit</button>
                        <button onClick={()=>{
                          recommend(item.id);
                        }}>👍 {item.thumb}</button>
                      </div>
                      <p>{item.text}</p>
                      <p>발행일 : {item.time.toLocaleString('ko-KR')}</p>
                    </li>
                  ))}
                </ul>
              </article>
            } />
            <Route path='/management' element={<Write setHlist={setHlist} setPlist={setPlist} addPost={addPost} hlist={hlist} plist={plist} postIndex={postIndex} editPost={editPost}/>} />
          </Routes>
        </main>
      </div>
  );
}

export default App;