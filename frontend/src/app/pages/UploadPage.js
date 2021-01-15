import { useState } from 'react';
import { any, isEmpty, pickAll, values } from 'ramda';
import { Alert, Button, Container, Input, Row } from 'reactstrap';

import { stringify } from 'app/utils/qs';
import Footer from 'app/components/Footer';
import Navigation from 'app/components/Navigation';

import api from 'app/utils/api';

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

function UploadPage({ history }) {
  const [data, setData] = useState({
    title: '',
    description: '',
    city: '',
    country: '',
    rating: 0,
    max_date: '',
    min_date: '',
    price: 0,
    images: []
  });
  const [error, setError] = useState([false, '']);

  const handleSearch = query => {
    const q = stringify(query);
    history.push(`/search?${q}`);
  };

  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    if (name === 'images' && e.target.files?.[0]) {
      const images$ = [...e.target.files].map(toBase64);
      Promise.all(images$).then(images => {
        setData(p => ({ ...p, images }));
      });
    } else
      setData(p => {
        const data = { ...p, [name]: value };
        return data;
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { min_date, max_date, rating, price, ..._formData } = pickAll(
      ['title', 'description', 'city', 'country', 'rating', 'max_date', 'min_date', 'price', 'images', 'type'],
      data
    );
    const formData = {
      ..._formData,
      dates_available: { min_date, max_date },
      rating: Number(rating),
      price: Number(price)
    };

    if (any(isEmpty, values(formData))) {
      setError([true, 'Please enter all the required information']);
    }

    api
      .post(`/listing`, formData)
      .then(res => {
        if (res.status === 200) {
          history.push(`/`);
        }
      })
      .catch(e => {
        console.error(e);
        if (e.response?.status === 403 || e.response?.status === 401)
          return history.replace({
            pathname: '/auth',
            state: {
              register: false
            }
          });
        else setError([true, 'Please enter all the required information']);
      });
  };

  return (
    <>
      <Navigation onSearch={handleSearch} />
      <Container>
        <Row className='mx-0 justify-content-center my-4'>
          <form
            action='#'
            className='col-sm-4 my-4 border shadow rounded-lg p-4 text-center'
            onChange={handleChange}
            onSubmit={handleSubmit}
          >
            <p className='h5'>Create Listing</p>
            {error[0] ? (
              <Alert color='danger' className='w-100'>
                {error[1]}
              </Alert>
            ) : null}

            <Input required className='my-2' name='title' placeholder='Listing Title' />
            <Input required className='my-2' name='description' type='textarea' placeholder='Description' />
            <Input required className='my-2' name='city' placeholder='City' />
            <Input required className='my-2' name='country' placeholder='Country' />
            <Input required className='my-2' name='rating' placeholder='Rating' type='number' min={0} max={5} />
            <label htmlFor='min_date' className='d-block my-2 border rounded-sm p-2 text-left overflow-hidden'>
              Available From
              <Input required name='min_date' id='min_date' type='date' className='border-0 p-0' />
            </label>
            <label htmlFor='max_date' className='d-block my-2 border rounded-sm p-2 text-left overflow-hidden'>
              Available Till
              <Input required name='max_date' id='max_date' type='date' className='border-0 p-0' />
            </label>
            <Input required className='my-2' name='price' placeholder='Price' type='number' min={0} max={500} />
            <Input required className='my-2' type='select' name='type' >
              <option value=''>Property Type</option>
              <option value='single'>Single Bedroom</option>
              <option value='double'>Double Bedroom</option>
              <option value='triple'>Triple Bedroom</option>
            </Input>
            <label htmlFor='images' className='d-block my-2 border rounded-sm p-2 text-left overflow-hidden'>
              Photos
              <Input
                required
                id='images'
                name='images'
                placeholder='Photos'
                type='file'
                accept='image/*'
                className='my-2'
                multiple
              />
            </label>
            <Button type='submit' color='primary'>
              Add Listing
            </Button>
          </form>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default UploadPage;
