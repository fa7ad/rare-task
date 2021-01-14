import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from 'app/pages/HomePage';
import SearchPage from 'app/pages/SearchPage';

function App() {
  return (
    <Container fluid>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/search' component={SearchPage} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
