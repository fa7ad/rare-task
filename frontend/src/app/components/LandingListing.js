import Rating from './Rating';

import { Col, Row } from 'reactstrap';

const FALLBACK_AVATAR = `https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png`;

function LandingListing(props) {
  const comment = props.comments?.[0]?.comment;
  return (
    <Col sm='4' className='rare__card pointer' onClick={props.onClick ?? (() => {})}>
      <img src={props.images?.[0]} alt='' className='w-100 rounded-lg' />
      <Rating count={props.rating} />
      <p className='text-muted'>
        {comment?.slice(0, 140)}
        {comment?.length > 140 && '...'}
      </p>
      <Row className='align-items-center my-3 mx-0'>
        <Col xs={2} className='rounded-circle bg-light p-0 overflow-hidden'>
          <img src={props.user.avatar ?? FALLBACK_AVATAR} alt='' width={60} height={60} />
        </Col>
        <Col xs={9}>
          <div className='text-bold'>{props.user.full_name}</div>
          <div className='text-muted'>
            {props.city}, {props.country}
          </div>
        </Col>
      </Row>
    </Col>
  );
}
export default LandingListing;
