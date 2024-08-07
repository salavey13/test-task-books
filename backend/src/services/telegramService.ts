// src/services/telegramService.ts

import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_IDS = process.env.ADMIN_CHAT_IDS?.split(',') || [];

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

export const notifyAdmin = async (message: string) => {
  const adminChatId = process.env.ADMIN_CHAT_ID;
  await bot.sendMessage(adminChatId, message);
};

// Handle user becoming admin request
bot.onText(/\/makeAdmin (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = match[1];

  // Make user admin in the database
  await prisma.user.update({
    where: { telegramId: userId },
    data: { role: 1 },
  });

  await bot.sendMessage(chatId, `User with ID ${userId} is now an admin.`);
});

export const sendAdminConfirmation = async (user: any) => {
  const confirmationLink = `${process.env.APP_URL}/confirm-admin/${user.id}`;

  ADMIN_CHAT_IDS.forEach(async (chatId) => {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: `New admin request from ${user.telegramUsername}. Confirm: ${confirmationLink}`,
    });
  });
};

export const sendAdminStatusNotification = async (user: any) => {
  const message = `Your status as admin has been confirmed! Access the app here: ${process.env.APP_URL}`;
  await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: user.telegramId,
    text: message,
  });
};