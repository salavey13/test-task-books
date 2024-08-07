import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import TelegramLogin from './components/TelegramLogin';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <TelegramLogin />
        <Switch>
          <Route path="/" exact component={BookList} />
          <Route path="/books/:id" component={BookDetails} />
          <Route path="/add-book" component={AddBook} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
