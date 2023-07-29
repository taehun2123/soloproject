import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
export function Header(){
  const navigate = useNavigate();
  return(
    <Navbar bg="dark" data-bs-theme="dark">
      <header>
        <Navbar.Brand href="#Home" onClick={()=>{navigate('/')}}>H's Mall</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="" onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link href="" onClick={()=>{navigate('/about')}}>About</Nav.Link>
            <Nav.Link href="" onClick={()=>{navigate('/product')}}>Products</Nav.Link>
            <Nav.Link href="" onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
        </Nav>
      </header>
    </Navbar>
  )
}