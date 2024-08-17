import React from 'react';

const TelegramLogin: React.FC = () => {
  const handleLogin = () => {
    window.location.href = `https://telegram.me/${process.env.REACT_APP_TELEGRAM_BOT_USERNAME}?start=login`;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Telegram</button>
    </div>
  );
};

export default TelegramLogin;
