import Rating from './Rating';

import { Col } from 'reactstrap';

function TallListing(props) {
  return (
    <Col sm='3' className='rare__card--tall' onClick={props.onClick ?? (() => {})}>
      <img src={props.images?.[0]} alt='' className='w-100' height={400} />
      <p className='text-muted'>
        ${props.price}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {props.title}
      </p>
      <Rating count={props.rating}>&nbsp;{props.comments.length} review(s)</Rating>
    </Col>
  );
}
export default TallListing;
