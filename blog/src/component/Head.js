import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import {App} from '../App'
export function Head() {
  return (
    <header className="header">
      <div className='title'>
        <h2><Link to="/">H's PortFolio</Link></h2>
      </div>
      <ul className="header-nav">
        <li href="#Write" className='nav'>
          <Link to="/management">글 쓰기</Link>
        </li>
        <li href="#List" className='nav'>
          <Link to="/">글 목록</Link>
        </li>
        <li href="#Guest" className="nav">
          추후 개발예정
        </li>
      </ul>
    </header>
  );
}