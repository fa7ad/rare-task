import { Col } from 'reactstrap';
const FALLBACK_LISTING = `https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png`;

function SearchListing(props) {
  return (
    <Col xs={12} className='d-flex my-2 pointer' onClick={props.onClick ?? (() => {})}>
      <Col xs={4} className='rounded-lg'>
        <img src={props.images?.[0] ?? FALLBACK_LISTING} alt='' className='w-100 rounded-lg' />
      </Col>
      <Col xs={8}>
        <div className='d-flex'>
          <p className='text-muted mr-auto'>{props.type}</p>
          <p className='text-muted'>
            <span className='text-danger'>★ </span> {props.rating}{' '}
            <span className='text-muted'>({props.comments.length})</span>
          </p>
        </div>
        <h3>{props.title}</h3>
        <p className='text-muted'>{props.description}</p>
        <div className='d-flex justify-content-end'>
          <h3>
            <strong>${props.price}</strong> / night
          </h3>
        </div>
      </Col>
    </Col>
  );
}

export default SearchListing;
