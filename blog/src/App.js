import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { Head } from './component/Head';
import { Write } from './component/Write';
import { useEffect, useRef, useState} from 'react';

function App() {
  const [hlist, setHlist] = useState("");
  const [plist, setPlist] = useState("");
  const [datafile, setDatafile] = useState([]);
  const navigate = useNavigate();
  const [postIndex, setPostIndex] = useState(null);
  const idRef = useRef(0);

  useEffect(()=>{
    loadPost();
  })
  function loadPost(){
    fetch("http://localhost:5050/post")
    .then(res=>res.json())
    .then(data=>
      setDatafile(data)
      )
  }

  async function addPost() {
    if(hlist && plist !== ""){
      const data = {
        id : idRef.current,
        title : hlist,
        content : plist,
        thumb : 0,
        time : new Date(),
      }
      const loadData = await fetch(`http://localhost:5050/postInsert`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      setHlist("");
      setPlist("");
      setPostIndex(null);
      alert("성공적으로 게시물이 발행되었습니다.");
      idRef.current += 1;
      navigate("/");
    } else {
      alert("제목과 내용을 입력해주세요!"); 
    }
  }
  async function recommend(index){ //id 값으로 따봉 올리는 방법
    const updatedData = {
      id: datafile[index].id, // 게시물 식별자 (예: 게시물의 고유 ID)
      title: datafile[index].title,
      content : datafile[index].content,
      thumb: datafile[index].thumb+=1
    };
    const loadData = await fetch(`http://localhost:5050/postUpdate`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
    const temp = [...datafile];
    temp[index].thumb += 1;
    setDatafile(temp);
  }
  
  // function removePost(id){
  //   const updatedData = data.filter(item => item.id !== id);
  //   setData(updatedData);
  // }

  function selectedPost(index){  //index 값을 이용하여 수정 게시글 변경하는 방법
    if (index !== 0){
    navigate("/management");
    setHlist(datafile[index].title);
    setPlist(datafile[index].content);
    setPostIndex(index);
  } else {
    alert("관리자의 게시물은 수정할 수 없습니다.")
  }
  }

  async function editPost(){
    if(hlist && plist !== ""){
      const updatedData = {
        id: datafile[postIndex].id, // 게시물 식별자 (예: 게시물의 고유 ID)
        title: hlist,
        content: plist,
        thumb: datafile[postIndex].thumb,
      };
      const loadData = await fetch(`http://localhost:5050/postUpdate`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
      datafile[postIndex].title = hlist;
      datafile[postIndex].content = plist;
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
                  {datafile.map((item, index) => (
                    <li className="list-text" key={index}>
                      <div className="list-hb">
                        <h2>{item.title}</h2>
                        {/* <button onClick={()=>{
                          let copy = [...datafile];
                          copy.splice(index,1);
                          setDatafile(copy);
                        }}>X</button> */}
                        <button onClick={()=>{selectedPost(index)}}>
                          Edit</button>
                        <button onClick={()=>{
                          recommend(index);
                        }}>👍 {item.thumb}</button>
                      </div>
                      <p>{item.content}</p>
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