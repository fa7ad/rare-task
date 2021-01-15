import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from 'app/pages/HomePage';
import SearchPage from 'app/pages/SearchPage';
import DetailsPage from 'app/pages/DetailsPage';

function App() {
  return (
    <Container fluid>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/details/:id' component={DetailsPage} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
