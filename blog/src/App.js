import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

function App() {
  const [hlist, setHlist] = useState("");
  const [plist, setPlist] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function addPost() {
    const newData = {
      title: hlist,
      text: plist,
    };
    setData([...data, newData]);
    setHlist("");
    setPlist("");
    navigate("/");
  }

  function removePost(id){
    const temp = [...data];
    temp.splice(id,1);
    setData(temp);
  }
  return (
      <div className="App">
        <header className="header">
          <div className='title'>
            <h2><Link to="/">H's PortFolio</Link></h2>
          </div>
          <ul className="header-nav">
            <li className='nav-on'>
              <Link to="/">글 목록</Link>
            </li>
            <li className="nav">
              방명록123123
            </li>
          </ul>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <article>
                <ul className="list">
                  {data.map((item, index) => (
                    <li className="list-text" key={index}>
                      <div className="list-hb">
                        <h2>{item.title}</h2>
                        <button onClick={removePost}>X</button>
                      </div>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </article>
            } />
            <Route path='/management' element={<Write setHlist={setHlist} setPlist={setPlist} addPost={addPost}/>} />
          </Routes>
        </main>
      </div>
  );
}
function Head() {
  return (
    <header className="header">
      <div className='title'>
        <h2><Link to="/">H's PortFolio</Link></h2>
      </div>
      <ul className="header-nav">
        <li className='nav-on'>
          <Link to="/">글 목록</Link>
        </li>
        <li className="nav">
          방명록
        </li>
      </ul>
    </header>
  );
}

function Write(props) {
  const { setHlist, setPlist, addPost } = props;

  return (
    <>
      <Head />
      <main>
        <article>
          <div className="list">
            <h2>
              <label>
                <input
                  className='titlebox'
                  onChange={(e) => {
                    setHlist(e.target.value);
                  }}
                  placeholder='제목'
                  maxLength={10}
                  width={100}
                />
              </label>
            </h2>
            <p>
              <label>
                <textarea
                  className="box"
                  onChange={(e) => {
                    setPlist(e.target.value);
                  }}
                  placeholder='내용'
                  width={100}
                />
              </label>
            </p>
          </div>
          <button onClick={addPost}>발행하기</button>
        </article>
      </main>
    </>
  );
}

export default App;