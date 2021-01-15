import { useEffect } from 'react';
import { Alert, Container, Row } from 'reactstrap';

import { stringify } from 'app/utils/qs';
import Footer from 'app/components/Footer';
import Navigation from 'app/components/Navigation';
import SearchListing from 'app/components/SearchListing';
import BannerSearch from 'app/components/BannerSearch';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings, searchResultsSelector } from 'features/search/searchSlice';

function SearchPage({ history, location }) {
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
    dispatch(fetchListings(location.search || '?'));
  }, [dispatch, location.search]);

  return (
    <>
      <Navigation onSearch={handleSearch} />
      <Container>
        <BannerSearch onSearch={handleSearch} />

        <Row className='mx-0'>
          {searchResults?.map(li => (
            <SearchListing {...li} key={li.id} onClick={handleSelect(li)} />
          ))}
          {!searchResults?.length > 0 && (
            <Alert className='mx-auto'>
              <p className='text-muted'>No listings found for the search parameters, please try a different search.</p>
            </Alert>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default SearchPage;
