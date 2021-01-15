import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from 'app/pages/HomePage';
import AuthPage from 'app/pages/AuthPage';
import SearchPage from 'app/pages/SearchPage';
import UploadPage from 'app/pages/UploadPage';
import DetailsPage from 'app/pages/DetailsPage';

function App() {
  return (
    <Container fluid>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/details/:id' component={DetailsPage} />
          <Route path='/auth' component={AuthPage} />
          <Route path='/new' component={UploadPage} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
