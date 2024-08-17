import React from 'react';
import BookList from './components/BookList.tsx';
import TelegramLogin from './components/TelegramLogin.tsx';

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
