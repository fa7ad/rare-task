import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarText, NavbarToggler, NavItem, NavLink, Row } from 'reactstrap';

import SplitSearch from './SplitSearch';

import './Navigation.css';

const registerLink = {
  pathname: '/auth',
  state: {
    register: true
  }
};

const loginLink = {
  pathname: '/auth',
  state: {
    register: false
  }
};

function Navigation({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='rare__navigation'>
      <Navbar color='white' light expand='md' className='row'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <NavbarText className='mr-auto d-flex col-sm-6'>
            <SplitSearch onSearch={onSearch} />
          </NavbarText>
          <Nav navbar>
            <NavItem>
              <Link to={registerLink} className='nav-link'>
                Become A Host
              </Link>
            </NavItem>
            <NavItem>
              <NavLink>Help</NavLink>
            </NavItem>
            <NavItem>
              <Link to={registerLink} className='nav-link'>
                Sign Up
              </Link>
            </NavItem>
            <NavItem>
              <Link to={loginLink} className='nav-link'>
                Log In
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Row className='rare__navtabs'>
        <Nav tabs>
          <NavItem>
            <NavLink active>For You</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Homes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Experiences</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Places</NavLink>
          </NavItem>
        </Nav>
      </Row>
    </div>
  );
}

export default Navigation;
