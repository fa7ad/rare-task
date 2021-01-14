import Rating from './Rating';

import { Col, Row } from 'reactstrap';
import { T } from 'ramda';

const FALLBACK_AVATAR = `https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png`;

function LandingListing(props) {
  return (
    <Col sm='4' className='rare__card pointer' onClick={props.onClick ?? T}>
      <img src={props.image} alt='' className='w-100 rounded-lg' />
      <Rating count={props.rating} />
      <p className='text-muted'>
        {props.comments.slice(0, 140)}
        {props.comments.length > 140 && '...'}
      </p>
      <Row className='align-items-center my-3 mx-0'>
        <Col xs={2} className='rounded-circle bg-light p-0'>
          <img src={props.avatar ?? FALLBACK_AVATAR} alt='' className='w-100' />
        </Col>
        <Col xs={9}>
          <div className='text-bold'>{props.username}</div>
          <div className='text-muted'>{props.country}</div>
        </Col>
      </Row>
    </Col>
  );
}
export default LandingListing;
