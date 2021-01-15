import qs from 'querystringify';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoSearchSharp, IoCalendarClearOutline, IoPeopleOutline } from 'react-icons/io5';
import { Col, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import './SplitSearch.css';

function SplitSearch({ onSearch }) {
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
    <form onChange={handleChange} onSubmit={handleSearch} onKeyDown={handleKeydown} className='d-flex rare__search'>
      <Col xs='4' className='px-0'>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <IoSearchSharp />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder='Anywhere' className='rounded-0' name='search' defaultValue={query.search} />
        </InputGroup>
      </Col>
      <Col xs='4' className='px-0'>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText className='rounded-0'>
              <IoCalendarClearOutline />
            </InputGroupText>
          </InputGroupAddon>
          <Input className='rounded-0' name='min_date' type='date' defaultValue={query.min_date} />
        </InputGroup>
      </Col>
      <Col xs='4' className='px-0'>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText className='rounded-0'>
              <IoPeopleOutline />
            </InputGroupText>
          </InputGroupAddon>
          <Input type='select' name='type' defaultValue={query.type}>
            <option value=''>Any Type</option>
            <option value='single'>Single Bedroom</option>
            <option value='double'>Double Bedroom</option>
            <option value='triple'>Triple Bedroom</option>
          </Input>
        </InputGroup>
      </Col>
    </form>
  );
}

export default SplitSearch;
