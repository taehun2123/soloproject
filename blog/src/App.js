import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { Head } from './component/Head';
import { Edit } from './component/Edit';
import { Write } from './component/Write';
import { useRef, useState} from 'react';

function App() {
  const [hlist, setHlist] = useState("");
  const [plist, setPlist] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const idRef = useRef(1);

  function addPost() {
    const newData = {
      id : idRef.current,
      title: hlist,
      text: plist,
    };
    setData([...data, newData]);
    setHlist("");
    setPlist("");
    alert("성공적으로 게시물이 발행되었습니다.");
    navigate("/");
    idRef.current += 1;
  }

  function removePost(id){
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  }

  function editPost(id){   
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    navigate("/edit");
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
                        <button onClick={()=>{removePost(item.id)}}>X</button>
                        <button onClick={()=>{editPost(item.id)}}>Edit</button>
                      </div>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </article>
            } />
            <Route path='/management' element={<Write setHlist={setHlist} setPlist={setPlist} addPost={addPost}/>} />
            <Route path='/edit' element={<Edit setHlist={setHlist} setPlist={setPlist} editPost={editPost} addPost={addPost}/>} />
          </Routes>
        </main>
      </div>
  );
}

export default App;