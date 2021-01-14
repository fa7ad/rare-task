import Rating from './Rating';

import { Col } from 'reactstrap';
import { T } from 'ramda';

function TallListing(props) {
  return (
    <Col sm='3' className='rare__card--tall' onClick={props.onClick ?? T}>
      <img src={props.image} alt='' className='w-100' height={400} />
      <p className='text-muted'>
        {props.price}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {props.title}
      </p>
      <Rating count={props.rating}>&nbsp;{(Math.random() * 100) | 0} reviews</Rating>
    </Col>
  );
}
export default TallListing;
