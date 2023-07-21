import { Outlet } from 'react-router-dom';

export function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <p><Outlet/></p>
    </div>
  )
}