import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.expand();
            handleTelegramLogin();
        } else {
            loadUserFromSessionStorage();
        }
    };

    // Fetch books when the button is clicked
    document.getElementById('fetch-books-button').addEventListener('click', fetchBooks);
});

// Handle Telegram login
async function handleTelegramLogin() {
    const initData = window.Telegram.WebApp.initData;
    if (initData) {
        const urlParams = new URLSearchParams(initData);
        const userParam = urlParams.get("user");

        if (userParam) {
            const user = JSON.parse(decodeURIComponent(userParam));
            sessionStorage.setItem("user_id", user.id);
            sessionStorage.setItem("username", user.username);
            sessionStorage.setItem("lang", user.language_code);

            await initUserFromTelegram(user);
        } else {
            console.error("Telegram user data is not available.");
        }
    } else {
        console.error("Telegram init data is undefined.");
    }

    applyTelegramTheme();
    configureBackButton();
}

// Initialize or fetch user from Supabase
async function initUserFromTelegram(telegramUser) {
    const telegram_id = telegramUser.id;

    let { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', telegram_id)
        .single();

    if (error) {
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([{
                telegram_id,
                telegram_username: telegramUser.username,
                lang: telegramUser.language_code,
                email: '', 
                password: '' 
            }])
            .select('*')
            .single();

        if (insertError) {
            console.error('Error registering user:', insertError);
            return;
        }

        user = newUser;
        notifyAdmins(`New user registered: ${telegramUser.username}`);
    }

    if (user) {
        updateUIWithUser(user);
    }
}

function updateUIWithUser(user) {
    document.getElementById('username').textContent = `Hello, ${user.telegram_username}!`;
    document.getElementById('welcome-message').textContent = `Welcome back, ${user.telegram_username}!`;
    document.getElementById('user-avatar').src = `https://avatars.dicebear.com/api/initials/${user.telegram_username}.svg`;
    document.getElementById('user-avatar').hidden = false;

    if (user.role === 0) {
        document.getElementById('admin-button').classList.remove('hidden');
        document.getElementById('admin-button').addEventListener('click', () => requestAdmin(user));
    }
}

async function fetchBooks() {
    const { data: books, error } = await supabase
        .from('books')
        .select('*');

    if (error) {
        console.error('Error fetching books:', error);
        return;
    }

    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow';
        bookCard.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${book.title}</h3>
            <p class="text-gray-700 mb-4">${book.author}</p>
            <p class="text-gray-500 text-sm">${book.description}</p>
            <p class="text-gray-400 text-xs mt-2">Published: ${new Date(book.published_date).toLocaleDateString()}</p>
        `;
        booksList.appendChild(bookCard);
    });
}

function applyTelegramTheme() {
    const themeParams = window.Telegram.WebApp.themeParams;

    if (themeParams) {
        document.documentElement.style.setProperty("--tg-theme-bg-color", themeParams.bg_color || "#1B1E23");
        document.documentElement.style.setProperty("--tg-theme-text-color", themeParams.text_color || "#000000");
        document.documentElement.style.setProperty("--tg-theme-hint-color", themeParams.hint_color || "#999999");
        document.documentElement.style.setProperty("--tg-theme-link-color", themeParams.link_color || "#1b73e8");
        document.documentElement.style.setProperty("--tg-theme-button-color", themeParams.button_color || "#0088cc");
        document.documentElement.style.setProperty("--tg-theme-button-text-color", themeParams.button_text_color || "#ffffff");
        document.documentElement.style.setProperty("--tg-theme-secondary-bg-color", themeParams.secondary_bg_color || "#f0f0f0");
        document.documentElement.style.setProperty("--tg-theme-header-bg-color", themeParams.header_bg_color || "#f5f5f5");
        document.documentElement.style.setProperty("--tg-theme-accent-text-color", themeParams.accent_text_color || "#ff4081");
    }
}

function configureBackButton() {
    const backButton = window.Telegram.WebApp.BackButton;
    if (backButton) {
        backButton.show();
        backButton.onClick(() => {
            window.history.back();
        });
    }
}

function loadUserFromSessionStorage() {
    const storedUserId = sessionStorage.getItem("user_id");
    const storedUsername = sessionStorage.getItem("username");
    const storedLang = sessionStorage.getItem("lang");

    if (storedUserId && storedUsername) {
        setCurrentUser({
            id: storedUserId,
            username: storedUsername,
            lang: storedLang,
        });

        // Update UI or handle further logic here
    }
}

async function requestAdmin(user) {
    const { data, error } = await supabase
        .from('users')
        .update({ role: 1 })
        .eq('telegram_id', user.id);

    if (error) {
        console.error('Error updating user role:', error);
        return;
    }

    alert('You are now an admin!');
}

async function notifyAdmins(message) {
    const { data: admins, error } = await supabase
        .from('users')
        .select('telegram_id')
        .eq('role', 1);

    if (error) {
        console.error('Error fetching admins:', error);
        return;
    }

    admins.forEach(admin => {
        // Notify each admin about the new user registration
        const adminId = admin.telegram_id;
        window.Telegram.WebApp.sendData(`notify_admin:${adminId}:${message}`);
    });
}

function setCurrentUser(user) {
    document.getElementById('username').textContent = `Hello, ${user.username}!`;
    document.getElementById('welcome-message').textContent = `Welcome back, ${user.username}!`;
    document.getElementById('user-avatar').src = `https://avatars.dicebear.com/api/initials/${user.username}.svg`;
    document.getElementById('user-avatar').hidden = false;

    // Display admin button if user is admin
    if (user.role === 0) {
        document.getElementById('admin-button').classList.remove('hidden');
        document.getElementById('admin-button').addEventListener('click', () => requestAdmin(user));
    }
}