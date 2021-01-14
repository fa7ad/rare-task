import { useEffect, useState } from 'react';
import { Alert, Container, Row } from 'reactstrap';

import api from 'app/utils/api';
import { stringify } from 'app/utils/qs';
import Footer from 'app/components/Footer';
import Navigation from 'app/components/Navigation';
import SearchListing from 'app/components/SearchListing';

function SearchPage({ history, location }) {
  const [results, setResults] = useState([]);

  const handleSearch = query => {
    const q = stringify(query);
    history.push(`/search?${q}`);
  };

  useEffect(() => {
    if (location.search)
      api
        .get(`/listing${location.search}`)
        .then(res => {
          setResults(res?.data?.listings ?? []);
        })
        .catch(e => {
          console.error(e);
          setResults([]);
        });
  }, [location.search]);

  return (
    <>
      <Navigation onSearch={handleSearch} />
      <Container>
        <Row className='rare__searchbanner my-4 mx-0 bg-primary text-white p-2'>
          <div className='searchbanner__text'>
            <h3>Resorts</h3>
            <p>Treat yourself! Your dream resort stay is just a few clicks away.</p>
          </div>
        </Row>

        <Row className='mx-0'>
          {results.map(li => (
            <SearchListing {...li} key={li.title + li.username} />
          ))}
          {!results?.length > 0 && (
            <Alert>
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
