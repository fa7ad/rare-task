import { useState } from 'react';
import { IoSearchSharp, IoCalendarClearOutline, IoPeopleOutline } from 'react-icons/io5';
import { Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import './SplitSearch.css';

function SplitSearch({ onSearch }) {
  const [query, setQuery] = useState({
    search: '',
    min_date: '',
    type: ''
  });
  const handleChange = e => {
    setQuery(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSearch = e => {
    e.preventDefault();
    console.log('submitted');
    onSearch?.(query);
  };
  return (
    <form onChange={handleChange} onSubmit={handleSearch} className='d-flex rare__search'>
      <Col xs='4' className='px-0'>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <IoSearchSharp />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder='Anywhere' className='rounded-0' name='search' />
        </InputGroup>
      </Col>
      <Col xs='4' className='px-0'>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText className='rounded-0'>
              <IoCalendarClearOutline />
            </InputGroupText>
          </InputGroupAddon>
          <Input className='rounded-0' name='min_date' type='date' />
        </InputGroup>
      </Col>
      <Col xs='4' className='px-0'>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText className='rounded-0'>
              <IoPeopleOutline />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder='One bedroom' name='type' />
          <InputGroupAddon addonType='append'>
            <Button color='secondary' type='submit'>
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </form>
  );
}

export default SplitSearch;
