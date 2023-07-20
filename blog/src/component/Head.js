import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import {App} from '../App'
export function Head() {
  return (
    <header className="header">
      <div className='title'>
        <h2><Link to="/">H's PortFolio</Link></h2>
      </div>
      <ul className="header-nav">
        <li className='nav'>
          <Link to="/management">글 쓰기</Link>
        </li>
        <li className='nav'>
          <Link to="/">글 목록</Link>
        </li>
        <li className="nav">
          방명록
        </li>
      </ul>
    </header>
  );
}