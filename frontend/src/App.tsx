import React from 'react';
import BookList from './components/BookList';
import TelegramLogin from './components/TelegramLogin';

const App: React.FC = () => {
  return (
    <div>
      <h1>Test Task Books</h1>
      <TelegramLogin />
      <BookList />
    </div>
  );
};

export default App;
