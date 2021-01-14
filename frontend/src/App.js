import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from 'app/pages/HomePage';

function App() {
  return (
    <Container fluid>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
