import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import {App} from '../App'
import { useState } from 'react';
import styles from "../Head.module.css"
export function Head(props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1); // 현재 활성화된 탭을 추적하는 상태
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    if(props.inLogin===false){
      navigate(`${tabItems[tabIndex-1].goto}`)
    } else {
      navigate(`${tabLoginItems[tabIndex-1].goto}`)
    }
  };

  const tabItems =
    [
      { id: 1, title: '게시판', goto : "/" },
      { id: 2, title: '추후 예정', goto : "/"},
      { id: 3, title: '로그인', goto : "/login"}
    ]
  const tabLoginItems=
  [
    { id: 1, title: '게시판', goto : "/" },
    { id: 2, title: '추후 예정', goto : "/"},
    { id: 3, title: '로그아웃', goto : "/logout"}
  ]
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h2>H's PortFolio</h2>
      </div>
      <ul className={styles.header_nav}>
      {props.inLogin===false ? tabItems.map((item) => (
          <div
            key={item.id}
            className={`nav ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => {handleTabClick(item.id)}}
          >
            {item.title}
          </div>
        ))
      : tabLoginItems.map((item) => (
        <div
          key={item.id}
          className={`nav ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => {handleTabClick(item.id)}}
        >
          {item.title}
        </div>
      ))}
      </ul>
    </header>
  );
}