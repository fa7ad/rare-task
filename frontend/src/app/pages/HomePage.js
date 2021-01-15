import BannerSearch from 'app/components/BannerSearch';
import Footer from 'app/components/Footer';
import LandingListing from 'app/components/LandingListing';
import Navigation from 'app/components/Navigation';
import TallListing from 'app/components/TallListing';
import { stringify } from 'app/utils/qs';
import { fetchListings, searchResultsSelector } from 'features/search/searchSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'reactstrap';

function HomePage({ history }) {
  const dispatch = useDispatch();
  const searchResults = useSelector(searchResultsSelector);

  const handleSearch = query => {
    const q = stringify(query);
    history.push(`/search?${q}`);
  };

  const handleSelect = li => () => {
    history.push(`/details/${li.id}`);
  };

  useEffect(() => {
    dispatch(fetchListings('?'));
  }, [dispatch]);

  return (
    <>
      <Navigation onSearch={handleSearch} />
      <Container>
        <BannerSearch onSearch={handleSearch} />
        <Row>
          <Container fluid className='mt-4'>
            <h3>What guests are saying about our homes in the United Kingdom</h3>
            <p>
              🌟 &nbsp;United Kingdom homes were rated <strong>4.7 out of 5 stars</strong> with{' '}
              <strong>10,500,000+ reviews</strong>
            </p>
            <Row>
              {searchResults?.map(li => (
                <LandingListing {...li} key={li.id} onClick={handleSelect(li)} />
              ))}
            </Row>
          </Container>
        </Row>
        <Row>
          <Container fluid className='mt-4'>
            <h3>Just Booked</h3>
            <Row>
              {searchResults?.map(li => (
                <TallListing {...li} key={li.id} onClick={handleSelect(li)} />
              ))}
            </Row>
          </Container>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
