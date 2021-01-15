import { useState } from 'react';
import { Alert, Button, Container, Input, Row } from 'reactstrap';

import { stringify } from 'app/utils/qs';
import Footer from 'app/components/Footer';
import Navigation from 'app/components/Navigation';

import { any, isEmpty, pickAll, values } from 'ramda';
import api from 'app/utils/api';

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

function AuthPage({ history, location }) {
  const [data, setData] = useState({
    username: '',
    password: '',
    full_name: '',
    avatar: ''
  });
  const [error, setError] = useState([false, '']);
  const isRegister = location.state?.register || false;

  const handleSearch = query => {
    const q = stringify(query);
    history.push(`/search?${q}`);
  };

  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    if (name === 'avatar' && e.target.files?.[0]) {
      toBase64(e.target.files?.[0]).then(avatar => {
        setData(p => ({ ...p, avatar }));
      });
    } else
      setData(p => {
        const data = { ...p, [name]: value };
        return data;
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = pickAll(
      isRegister ? ['full_name', 'avatar', 'username', 'password'] : ['username', 'password'],
      data
    );
    if (any(isEmpty, values(formData))) {
      setError([true, 'Please enter all the required information']);
    }

    api
      .post(isRegister ? `/auth/register` : `/auth/login`, formData)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('app_token', res.data?.token);
        }
        history.push(`/new`);
      })
      .catch(e => {
        console.error(e);
        setError([true, 'Please enter all the required information']);
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
            <p className='h5'>{isRegister ? 'Sign Up' : 'Log In'}</p>
            {error[0] ? (
              <Alert color='danger' className='w-100'>
                {error[1]}
              </Alert>
            ) : null}
            {isRegister ? (
              <>
                <Input required className='my-2' name='full_name' placeholder='Full Name' />
                <Input required className='my-2' name='username' placeholder='Username' />
                <Input required className='my-2' name='password' placeholder='Password' type='password' />
                <label htmlFor='avatar' className='d-block my-2 border rounded-sm p-2 text-left overflow-hidden'>
                  Avatar
                  <Input
                    required
                    id='avatar'
                    name='avatar'
                    placeholder='Avatar'
                    type='file'
                    accept='image/*'
                    className='my-2'
                  />
                </label>
                <Button type='submit' color='primary'>
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Input required className='my-2' name='username' placeholder='Username' />
                <Input required className='my-2' name='password' placeholder='Password' type='password' />
                <Button type='submit' color='primary'>
                  {isRegister ? 'Sign Up' : 'Log In'}
                </Button>
              </>
            )}
          </form>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default AuthPage;
