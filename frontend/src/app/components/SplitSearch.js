import { Col, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { IoSearchSharp, IoCalendarClearOutline, IoPeopleOutline } from 'react-icons/io5';

import './SplitSearch.css';

function SplitSearch() {
  return (
    <div className='d-flex rare__search'>
      <Col xs='4' className='px-0'>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <IoSearchSharp />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder='' className='rounded-0' />
        </InputGroup>
      </Col>
      <Col xs='4' className='px-0'>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText className='rounded-0'>
              <IoCalendarClearOutline />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder='' className='rounded-0' />
        </InputGroup>
      </Col>
      <Col xs='4' className='px-0'>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText className='rounded-0'>
              <IoPeopleOutline />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder='' />
        </InputGroup>
      </Col>
    </div>
  );
}

export default SplitSearch;
