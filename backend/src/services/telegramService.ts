import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const ADMIN_CHAT_IDS = process.env.ADMIN_CHAT_IDS?.split(',') || [];
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export const notifyAdmin = async (message: string) => {
  const adminChatId = process.env.ADMIN_CHAT_ID!;
  try {
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: adminChatId,
      text: message,
    });
    console.log(`Notification sent to admin chat ID ${adminChatId}`);
  } catch (error: any) {
    console.error(`Error sending notification to admin: ${error.message}`);
  }
};

export const handleMakeAdminRequest = async (chatId: number, userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { telegramId: userId },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 1 },
      });

      await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
        chat_id: chatId,
        text: `User with ID ${userId} is now an admin.`,
      });
    }
  } catch (error: any) {
    console.error(`Error handling makeAdmin request: ${error.message}`);
  }
};

export const sendAdminConfirmation = async (user: any) => {
  const confirmationLink = `${process.env.APP_URL}/confirm-admin/${user.id}`;

  try {
    await Promise.all(
      ADMIN_CHAT_IDS.map(chatId =>
        axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
          chat_id: chatId,
          text: `New admin request from ${user.telegramUsername}. Confirm: ${confirmationLink}`,
        })
      )
    );
    console.log('Admin confirmation notifications sent.');
  } catch (error: any) {
    console.error(`Error sending admin confirmation notifications: ${error.message}`);
  }
};

export const sendAdminStatusNotification = async (user: any) => {
  const message = `Your status as admin has been confirmed! Access the app here: ${process.env.APP_URL}`;

  try {
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: user.telegramId,
      text: message,
    });
    console.log(`Admin status notification sent to user ID ${user.telegramId}`);
  } catch (error: any) {
    console.error(`Error sending admin status notification: ${error.message}`);
  }
};
