import qs from 'querystringify';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoPeopleOutline, IoBed, IoCalendarOutline } from 'react-icons/io5';
import { Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';

import './BannerSearch.css';

function BannerSearch({ onSearch }) {
  const location = useLocation();
  const [query, setQuery] = useState({
    search: '',
    min_date: '',
    type: ''
  });
  const handleChange = e => {
    setQuery(p => {
      const query = { ...p, [e.target.name]: e.target.value };
      onSearch?.(query);
      return query;
    });
  };

  const handleSearch = e => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleKeydown = e => {
    if (e.key === 'Enter') onSearch?.(query);
  };

  useEffect(() => {
    const q = qs.parse(location.search);
    setQuery(p => ({ ...p, ...q }));
  }, [location.search, setQuery]);

  return (
    <Row className='rare__searchbanner my-4 mx-0 text-white p-2'>
      <div className='searchbanner__text'>
        <h3>Resorts</h3>
        <p>Treat yourself! Your dream resort stay is just a few clicks away.</p>
      </div>
      <form
        onChange={handleChange}
        onSubmit={handleSearch}
        onKeyDown={handleKeydown}
        className='d-flex rare__bannersearch'
      >
        <Col xs='5' className='px-0'>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <IoBed />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder='More places than you could ever go (but you can try)'
              className='rounded-0'
              name='search'
              defaultValue={query.search}
            />
          </InputGroup>
        </Col>
        <Col xs='3' className='px-0'>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText className='rounded-0'>
                <IoCalendarOutline />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder='Check in'
              className='rounded-0'
              name='min_date'
              type='date'
              defaultValue={query.min_date}
            />
          </InputGroup>
        </Col>
        <Col xs='3' className='px-0'>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText className='rounded-0'>
                <IoPeopleOutline />
              </InputGroupText>
            </InputGroupAddon>
            <Input className='rounded-0' type='select' name='type' defaultValue={query.type}>
              <option value=''>Any Type</option>
              <option value='single'>Single Bedroom</option>
              <option value='double'>Double Bedroom</option>
              <option value='triple'>Triple Bedroom</option>
            </Input>
          </InputGroup>
        </Col>
        <Col className='px-0'>
          <Button color='primary'>Search</Button>
        </Col>
      </form>
    </Row>
  );
}

export default BannerSearch;
