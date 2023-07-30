import { useState } from 'react';
import styles from '../Tab.module.css'
export function Tab(props){
  // 탭 부분
  const [activeTab, setActiveTab] = useState(1); // 현재 활성화된 탭을 추적하는 상태
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    props.navigate(`/user/${tabIndex}`);
  };

  const tabItems = [
    { id: 1, title: '커피' },
    { id: 2, title: '아이스크림' },
    { id: 3, title: '디저트' },
  ];
  return(
      <div className={styles.tabnav}>
        {tabItems.map((item) => (
          <div
            key={item.id}
            className={`tab-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => {handleTabClick(item.id)}}
          >
            {item.title}
          </div>
        ))}
      </div>
  )
}