import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigationbar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Social Media Analytics</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/top-users">Top Users</Nav.Link>
          <Nav.Link as={Link} to="/trending">Trending Posts</Nav.Link>
          <Nav.Link as={Link} to="/">Feed</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
