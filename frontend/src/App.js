import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext, useState } from "react";
import { Store } from './Store';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import AddServicePage from './pages/AddServicesPage';
import AdminRoute from './components/AdminRoute';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import SearchBox from './components/SearchBox';
import SearchPage from './pages/SearchPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    window.location.href = '/signin';
  }

  
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container className="mt-3">
              <LinkContainer to="/">
                <Navbar.Brand>EcoMenders</Navbar.Brand>
              </LinkContainer>
              <NavbarCollapse id="basic-navbar-nav">
                <SearchBox />
              </NavbarCollapse>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart 
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link className="dropdown-item" to="#signout" 
                    onClick={signoutHandler}> Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin"> Sign In </Link>
                ) }
                { userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/servicelist">
                      <NavDropdown.Item>All Services</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/addservices">
                      <NavDropdown.Item>Add New Services</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/updateservices">
                      <NavDropdown.Item>Update Services</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/deleteservices">
                      <NavDropdown.Item>Remove Services</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
          <Routes>
            <Route path="/service/:slug" element={<ServicePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            {/* Admin Routes */}
            <Route path="/admin/servicelist" element={<AdminRoute><AddServicePage /></AdminRoute>} />
          </Routes>
          </Container>
          </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
