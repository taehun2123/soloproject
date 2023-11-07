import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { Head } from './component/Head';
import { Write } from './component/Write';
import { List } from './component/List'
import { Login } from './component/Login';
import { Signup } from './component/Signup';
import { Logout } from './component/Logout';
import { useEffect, useState} from 'react';

function App() {
  const [hlist, setHlist] = useState("");
  const [plist, setPlist] = useState("");
  const [datafile, setDatafile] = useState([]);
  const navigate = useNavigate();
  const [postIndex, setPostIndex] = useState(null);
  const [inLogin, setInLogin] = useState(false);
  const storedUser = JSON.parse(sessionStorage.getItem('user'));

  // 게시글 목록 불러오기
  useEffect(()=>{
    loadPost();
    if(storedUser){
      setInLogin(true);
    }
}, [])

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
        title : hlist,
        content : plist,
        date : new Date().toLocaleString(),
        log: storedUser.userId,
      }
      const createPost = await fetch(`http://localhost:5050/post`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await createPost.json();
      alert(result.message);
      if(result.success) {
        setHlist("");
        setPlist("");
        setPostIndex(null);
        navigate("/");
        window.location.reload(true);
      } else {
        alert("제목과 내용을 입력해주세요!"); 
      }
  }
}
  
  async function deletePost(id){{
    const loadData = await fetch(`http://localhost:5050/postDelete/${id}`,{
      method: 'DELETE',
    });
    const result = await loadData.json();
    alert(result.message);
    window.location.reload(true);
  }
}

  function selectedPost(index){  //index 값을 이용하여 수정 게시글 변경하는 방법
    if (datafile[index].log==storedUser.userId){
    navigate("/write");
    setHlist(datafile[index].title);
    setPlist(datafile[index].content);
    setPostIndex(index);
  } else {
    alert("본인의 게시글만 수정할 수 있습니다.")
  }
  }

  async function editPost(){
    if(hlist && plist !== ""){
      const updatedData = {
        title: hlist,
        content: plist,
        time : new Date().toLocaleString(),
        log: storedUser.userId,
      };
      const loadData = await fetch(`http://localhost:5050/post/${datafile[postIndex].id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
      const result = await loadData.json();
      alert(result.message);
      navigate("/");
      loadPost();
      setHlist("");
      setPlist("");
      setPostIndex(null);
    } else {
      alert("제목과 내용을 작성해주세요!"); 
    }
  }

  return (
      <div className="App">
        <Head setInLogin={setInLogin} inLogin={inLogin}/>
        <main>
          <Routes>
            <Route path="/" element={
              <List datafile={datafile} selectedPost={selectedPost} navigate={navigate} inLogin={inLogin} deletePost={deletePost}/>
            } />
              <Route path='/write' element={<Write setHlist={setHlist} setPlist={setPlist} addPost={addPost} hlist={hlist} plist={plist} postIndex={postIndex} editPost={editPost}/>} />
              <Route path='/login' element={
                <Login navigate={navigate} inLogin={inLogin} setInLogin={setInLogin}/>
              }/>
              <Route path='/signup' element={
                <Signup setInLogin={setInLogin} navigate={navigate}/>
              }/>
              <Route path='/logout' element={
                <Logout setInLogin={setInLogin} navigate={navigate}/>
              }/>
          </Routes>
        </main>
      </div>
  );
}

export default App;