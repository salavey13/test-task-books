import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TelegramLogin: React.FC = () => {
  const [telegramUser, setTelegramUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initData) {
      const tgData = window.Telegram.WebApp.initDataUnsafe;
      setTelegramUser(tgData?.user || null);

      if (tgData?.user) {
        axios.post('/api/telegram-login', { telegramId: tgData.user.id, telegramUsername: tgData.user.username })
          .then(() => {
            console.log('User logged in via Telegram');
          })
          .catch(err => {
            console.error('Telegram login failed', err);
          });
      }
    }
  }, []);

  const handleBecomeAdmin = () => {
    if (telegramUser) {
      axios.post('/api/become-admin', { telegramId: telegramUser.id })
        .then(() => {
          alert('Admin request sent!');
        })
        .catch(err => {
          console.error('Failed to send admin request', err);
        });
    }
  };

  return (
    <div>
      {telegramUser ? (
        <div>
          <span>Welcome, {telegramUser.username}</span>
          <button onClick={handleBecomeAdmin}>Become Admin</button>
        </div>
      ) : (
        <a href="https://t.me/oneSitePlsBot/books">Open in Telegram</a>
      )}
    </div>
  );
};

export default TelegramLogin;