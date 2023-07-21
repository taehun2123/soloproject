import { Outlet } from 'react-router-dom'
export function About(){
  return (
    <div>
      <h3>정보</h3>
      <h4><Outlet/></h4>
    </div>
  )
}