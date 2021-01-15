/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaAirbnb } from 'react-icons/fa';
import { Input } from 'reactstrap';
function Footer() {
  return (
    <section id='footer' className='border-top px-0 py-4 mt-5'>
      <div className='container'>
        <div className='row text-center text-xs-center text-sm-left text-md-left'>
          <div className='col-xs-12 col-sm-3 col-md-3 d-flex flex-column h4 text-secondary'>
            <Input className='my-2' type='select'>
              <option>English</option>
            </Input>
            <Input className='my-2' type='select'>
              <option>USD</option>
            </Input>
          </div>
          <div className='col-xs-12 col-sm-3 col-md-3'>
            <h5>Airbnb</h5>
            <ul className='list-unstyled quick-links'>
              <li>About us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Policies</li>
              <li>Help</li>
              <li>Diversity &amp; Belonging</li>
            </ul>
          </div>
          <div className='col-xs-12 col-sm-3 col-md-3'>
            <h5>Discover</h5>
            <ul className='list-unstyled quick-links'>
              <li>Trust &amp; Safety</li>
              <li>Travel Credit</li>
              <li>Gift Cards</li>
              <li>Airbnb Citizen</li>
              <li>Business Travel</li>
              <li>Guidebooks</li>
              <li>Airbnb</li>
            </ul>
          </div>
          <div className='col-xs-12 col-sm-3 col-md-3'>
            <h5>Hosting</h5>
            <ul className='list-unstyled quick-links'>
              <li>Why Host</li>
              <li>Hospitality</li>
              <li>Responsible Hosting</li>
              <li>Community Center</li>
            </ul>
          </div>
        </div>
        <div className='row border-top'>
          <div className='col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 d-flex justify-content-between'>
            <p className='h6 mr-auto'>
              <a className='text-secondary' href='https://www.sunlimetech.com'>
                <FaAirbnb /> Airbnb, Inc.
              </a>
            </p>
            <ul className='list-unstyled d-flex'>
              <li className='mx-2'>Terms</li>
              <li className='mx-2'>Privacy</li>
            </ul>
          </div>
          <hr />
        </div>
      </div>
    </section>
  );
}

export default Footer;
