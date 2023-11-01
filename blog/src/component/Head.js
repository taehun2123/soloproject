import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import {App} from '../App'
import { useState } from 'react';
import styles from "./Head.module.css"
export function Head(props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1); // 현재 활성화된 탭을 추적하는 상태
  const handleTabClick = (item) => {
    setActiveTab(item.id);
    navigate(`${item.goto}`)
  };

  const tabItems =
    [
      { id: 1, title: '게시판', goto : "/" },
      { id: 2, title: '추후 예정', goto : "/"},
      { id: 3, title: props.inLogin ? '로그아웃' : '로그인', goto : props.inLogin ? "/logout" : "/login"}
    ]

  return (
    <header className={styles.header}>
      <div onClick={()=>navigate("/")} className={styles.title}>
        <h2>H's PortFolio</h2>
      </div>
      <ul className={styles.header_nav}>
        {tabItems.map((item, index) => (
          <div
            key={index}
            className={`nav ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => {handleTabClick(item)}}
          >
            {item.title}
          </div>
        ))}
      </ul>
    </header>
  );
}