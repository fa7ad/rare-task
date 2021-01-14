import Navigation from 'app/components/Navigation';
import Rating from 'app/components/Rating';
import { Col, Container, Row } from 'reactstrap';

const Listings_DEMO = [
  {
    image:
      'https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png',
    rating: 4,
    title: 'Private Room- 1Double & 1Single Bed-Central London',
    description:
      'A Private Room in Shared flat with a friendly professional female and her two lovable pugs(dogs).I look forward to hosting you in my home and welcoming you to London',
    price: '£200',
    type: 'single',
    comments: 'We hated your smelly shitty house',
    avatar: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/female-avatar-12-774634.png',
    username: 'Wasiq',
    country: 'UK',
    city: 'london'
  },
  {
    image: 'https://a0.muscache.com/4ea/air/v2/pictures/1b66acbb-f665-43c5-a505-794a4f343e6b.jpg',
    rating: 3,
    title: 'Private Room- 1Double & 1Single Bed-Central London',
    description:
      'A Private Room in Shared flat with a friendly professional female and her two lovable pugs(dogs).I look forward to hosting you in my home and welcoming you to London',
    price: '£200',
    type: 'single',
    comments: 'We liked the stay',
    avatar: 'https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png',
    username: 'Marleen',
    country: 'Germany'
  },
  {
    image: 'https://a0.muscache.com/4ea/air/v2/pictures/7fbb6427-c0f2-4336-b491-b21d2c866c39.jpg',
    rating: 2,
    title: 'Private Room- 1Double & 1Single Bed-Central London',
    description:
      'A Private Room in Shared flat with a friendly professional female and her two lovable pugs(dogs).I look forward to hosting you in my home and welcoming you to London',
    price: '£200',
    type: 'single',
    comments: 'We loved your house',
    avatar: 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png',
    username: 'Julie',
    country: 'Uk'
  },
  {
    image: 'https://a0.muscache.com/4ea/air/v2/pictures/4973ce42-d15c-4f6d-9cc3-dd0d52b60261.jpg',
    rating: 1,
    title: 'Private Room- 1Double & 1Single Bed-Central London',
    description:
      'A Private Room in Shared flat with a friendly professional female and her two lovable pugs(dogs).I look forward to hosting you in my home and welcoming you to London',
    price: '£200',
    type: 'single',
    comments: 'We hated your house',
    avatar: 'https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png',
    username: 'Ernest',
    country: 'Ukraine'
  }
];
const FIXED_AVATAR = `https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png`;

function HomePage() {
  return (
    <>
      <Navigation />
      <Container className=''>
        <Row className='rare__searchbanner my-4'>
          <div className='searchbanner__text'>
            <h3>Resorts</h3>
            <p>Treat yourself! Your dream resort stay is just a few clicks away.</p>
          </div>
        </Row>
        <Row>
          <Container fluid>
            <h3>What guests are saying about our homes in the United Kingdom</h3>
            <p>
              🌟 &nbsp;United Kingdom homes were rated <strong>4.7 out of 5 stars</strong> with{' '}
              <strong>10,500,000+ reviews</strong>
            </p>
            <Row>
              {Listings_DEMO.map(li => (
                <Col sm='4' className='rare__card' key={li.title}>
                  <img src={li.image} alt='' className='w-100' />
                  <Rating count={li.rating} />
                  <p className='text-muted'>
                    {li.comments.slice(0, 140)}
                    {li.comments.length > 140 && '...'}
                  </p>
                  <Row className='align-items-center my-3'>
                    <Col xs={3} className='rounded-full'>
                      <img src={li.avatar ?? FIXED_AVATAR} alt='' className='w-100' />
                    </Col>
                    <Col xs={9}>
                      <div className='text-bold'>{li.username}</div>
                      <div className='text-muted'>{li.country}</div>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
