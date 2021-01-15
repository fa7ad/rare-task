import { useEffect } from 'react';
import Gallery from 'react-grid-gallery';
import { Alert, Button, Col, Container, Input, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { stringify } from 'app/utils/qs';
import Rating from 'app/components/Rating';
import Footer from 'app/components/Footer';
import Navigation from 'app/components/Navigation';
import BannerSearch from 'app/components/BannerSearch';
import { selectedListingSelector, fetchListingDetails } from 'features/listing/listingSlice';
import dayjs from 'dayjs';
import { IoArrowForward } from 'react-icons/io5';

function DetailsPage({ history, match }) {
  const dispatch = useDispatch();
  const listing = useSelector(selectedListingSelector);
  const id = Number(match.params?.id ?? '-1');

  const handleSearch = query => {
    const q = stringify(query);
    history.push(`/search?${q}`);
  };

  useEffect(() => {
    dispatch(fetchListingDetails(id));
  }, [dispatch, id]);

  const diffNights = listing.id
    ? dayjs(listing.dates_available.max_date).diff(listing.dates_available.min_date, 'days')
    : 0;

  return (
    <>
      <Navigation onSearch={handleSearch} />
      <Container>
        <BannerSearch onSearch={handleSearch} />

        <Row className='mx-0'>
          {!listing?.id ? (
            <Alert className='mx-auto' color='warning'>
              <p className='text-muted'>No listings found with this ID, please try searching for a listing.</p>
            </Alert>
          ) : (
            <Col xs={12}>
              <h4 className='text-primary d-flex align-items-center'>
                {listing.title}{' '}
                <span className='ml-2' style={{ fontSize: '1.2rem' }}>
                  <Rating fillColor='gold' blankColor='white' count={listing.rating} />
                </span>
              </h4>
              <div className='text-muted'>
                {listing.city}, {listing.country}
              </div>
              <Row className='mb-4 w-100 d-block mx-0' style={{ minHeight: 500 }}>
                <Gallery
                  maxRows={1}
                  rowHeight={500}
                  images={listing.images?.map((img, i) => ({
                    src: img,
                    thumbnail: img,
                    thumbnailWidth: i !== 0 ? 400 : 600,
                    thumbnailHeight: i !== 0 ? 800 : 400
                  }))}
                />
              </Row>
              <Row className='w-100 mt-4 mx-0'>
                <Col sm={7}>
                  <Row>
                    <h3 className='col-7'>{listing.title}</h3>
                    <div className='ml-1 col-2 text-center'>
                      <img
                        src={listing.user.avatar}
                        alt=''
                        width={48}
                        height={48}
                        className='overflow-hidden rounded-full'
                      />
                      <div className='text-muted'>{listing.user.username}</div>
                    </div>
                  </Row>
                  <p className='text-muted'>{listing.city}</p>
                  <p className='text-muted'>{listing.description}</p>
                </Col>
                <Col sm={5} className='px-0'>
                  <aside className='rare__sidebar p-3'>
                    <div className='d-flex align-items-center'>
                      <h3>${listing.price} </h3>
                      <div className='text-muted'>&nbsp;per night</div>
                    </div>
                    <p>
                      <span className='text-success'>★ </span> <strong>{listing.rating}</strong>{' '}
                      <span className='text-muted'>({listing.comments.length} reviews)</span>
                    </p>
                    <hr />
                    <section className='py-1'>
                      <div className='text-muted'>
                        <strong>Dates</strong>
                      </div>
                      <div className='rare__dates'>
                        <span>{dayjs(listing.dates_available.min_date).format('DD/MM/YYYY')}</span>
                        <span>
                          <IoArrowForward width={48} />{' '}
                        </span>
                        <span>{dayjs(listing.dates_available.max_date).format('DD/MM/YYYY')}</span>
                      </div>
                    </section>
                    <section className='py-1'>
                      <div className='text-muted'>
                        <strong>Guests</strong>
                      </div>
                      <Input type='select' className='rare__dates p-2'>
                        <option>1 guest</option>
                        <option>2 guests</option>
                        <option>3 guests</option>
                        <option>4 guests</option>
                        <option>5 guests</option>
                      </Input>
                    </section>
                    <section className='rare__pricing'>
                      <div className='pricing__row'>
                        <span>
                          ${listing.price} &times; {diffNights} nights
                        </span>
                        <span>${(listing.price * diffNights).toLocaleString()}</span>
                      </div>
                      <div className='pricing__row'>
                        <span>Cleaning Fee</span>
                        <span>$5</span>
                      </div>
                      <div className='pricing__row'>
                        <span>Service Fee</span>
                        <span>$4</span>
                      </div>
                      <div className='pricing__row'>
                        <span>
                          <strong>Total</strong>
                        </span>
                        <span>
                          <strong>${(listing.price * diffNights + 5 + 4).toLocaleString()}</strong>
                        </span>
                      </div>
                    </section>
                    <section className='my-2 px-2'>
                      <Button color='danger' className='w-100' size='lg'>
                        Reserve
                      </Button>
                      <p className='text-center text-muted my-2 w-100 text-small text-bold'>
                        You won&lsquo;t be charged yet
                        <br />
                        Certain reservations may also require a security deposit.
                      </p>
                    </section>
                  </aside>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default DetailsPage;
