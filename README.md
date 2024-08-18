# Test Task Books
This project provides a backend API for managing a collection of books and a frontend for interacting with it. It includes features for user authentication (via email and Telegram), managing roles. Users can request to become admins, and current admins can confirm new admin requests via Telegram notifications. 

## Project Overview

### Default Serverless Setup (Tailwind CSS + Supabase)

This project is configured to use Tailwind CSS for styling and Supabase as the backend service, providing a modern, serverless architecture.

- **Styling**: Tailwind CSS
- **Backend**: Supabase (without authentication for simplicity)
- **Deployment**: Vercel (configured for serverless deployment)

### Features

- **User Management**: Register users based on Telegram ID and allow them to request admin access.
- **Books Management**: Display a list of books fetched from Supabase.
- **Admin Notifications**: Notify current admins when a new user registers or requests admin status.

### Setup

1. **Install Dependencies:**
   ```bash
   cd serverless
   npm install
   ```

2. **Set Up Environment Variables:**
   - Create a `.env` file with your Supabase credentials.

3. **Build the Project:**
   ```bash
   npm run build
   ```

4. **Deploy to Vercel:**
   ```bash
   vercel
   ```

### Traditional Backend/Frontend Setup

For those interested in the traditional setup, refer to the backend and frontend directories for instructions.

## Technologies Used

- **Tailwind CSS**: A utility-first CSS framework.
- **Supabase**: An open-source Firebase alternative.
- **Vercel**: A platform for deploying frontend frameworks and static sites.

### Explanation of Tailwind CSS

**Tailwind CSS** is a utility-first CSS framework where you build designs by composing small utility classes directly in your HTML. Instead of writing custom CSS for each component, you use Tailwind's pre-defined classes to style elements quickly.

- **Utility Classes**: Tailwind provides a wide range of utility classes like `bg-blue-500`, `text-center`, `p-4`, `text-white`, and more. These classes can be combined to achieve complex designs.
- **Responsive Design**: Tailwind has built-in responsive classes like `md:text-xl`, `lg:p-6`, etc., to handle different screen sizes.
- **Customization**: Tailwind is highly customizable through its config file, allowing you to extend or override the default styles.

### Optional Traditional Setup (Node.js Backend + Redis + JWT)

For those interested in a more traditional setup, the project also includes a backend built with Node.js, using Redis for caching and JWT for authentication.

- **Backend**: Node.js, Express.js, Redis, JWT
- **Frontend**: Parcel-based build process
- **Deployment**: Can be configured for Vercel or other platforms.

## How to Run

### Serverless Setup (Default)

1. Navigate to the `serverless` directory.
2. Run `npm install` to install dependencies.
3. Set up your environment variables in a `.env` file.
4. Run `npm run build` to build the project.
5. Deploy to Vercel using `vercel` CLI.

### Traditional Setup

1. Navigate to the `backend` and `frontend` directories.
2. Follow the instructions in the respective `README` files.
3. Deploy using your preferred method.
It includes support for both Supabase and local PostgreSQL with Redis. The project is split into two main parts: backend and frontend.

## Project Structure

- **backend/**: Contains the backend code including controllers, routes, and services.
- **frontend/**: Contains the frontend code built with React and TypeScript.
- **script/**: Contains a setup script for initializing the project environment.

```plaintext
test-task-books/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Optional: For PostgreSQL setup
│   │   └── migrations/            # Optional: PostgreSQL migrations
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── userController.ts
│   │   │   ├── userController-postgres.ts  # Optional: For PostgreSQL setup
│   │   │   ├── bookController.ts
│   │   │   └── bookController-postgres.ts  # Optional: For PostgreSQL setup
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorMiddleware.ts
│   │   ├── routes/
│   │   │   ├── bookRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── services/
│   │   │   ├── emailService.ts
│   │   │   ├── redisService.ts
│   │   │   └── telegramService.ts
│   │   ├── supabaseClient.ts
│   │   ├── prismaClient.ts        # Optional: For PostgreSQL setup
│   │   ├── index.ts
│   │   └── vercel.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                       # Supabase configuration by default
│   └── .env.redis_pg              # Optional: Redis/PostgreSQL configuration
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookList.tsx
│   │   │   ├── BookDetails.tsx
│   │   │   ├── AddBook.tsx
│   │   │   └── TelegramLogin.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── vercel.json
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── serverless
│   ├── public/
│   ├── src/
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── scripts/
│   │   │   └── main.js
│   │   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env
│   └── package.json
├── script/
│   └── setup_project.bat            # Setup script for local development
├── README.md
└── vercel.json
```

### Backend Files

#### `.env` (Default: Supabase configuration)
```env
# Common
JWT_SECRET=<your_jwt_secret>

# For Supabase
SUPABASE_URL=<your_supabase_url>
SUPABASE_KEY=<your_supabase_key>
REDIS_URL=redis://localhost:6379 # Optional: Only if Redis is used for caching
```

#### `.env.redis_pg` (Optional: Redis/PostgreSQL configuration)
```env
# Common
JWT_SECRET=<your_jwt_secret>

# For Local PostgreSQL and Redis (optional)
DATABASE_URL=postgresql://user:password@localhost:5432/testdb
REDIS_URL=redis://localhost:6379
```

#### `src/prismaClient.ts` (Optional: For PostgreSQL setup)
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

## Features

- User registration via email or Telegram.
- Admin confirmation workflow via Telegram.
- Book management (CRUD operations).
- Data stored in Supabase (PostgreSQL) with Prisma ORM.
- Redis caching.
- Email notifications using Nodemailer.

## Project Setup

### Prerequisites
- Node.js (v16.x or later)
- Supabase account (or PostgreSQL and Redis if you choose the optional setup)
- Telegram account for Telegram login and role management
- Telegram bot
- Nodemailer-compatible email service
- Vercel account (optional, for deployment)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/test-task-books.git
cd test-task-books
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Environment Variables

#### Default: Supabase Setup
1. Create a `.env` file in the `backend/` directory based on the `.env.example` provided:

    ```bash
    SUPABASE_URL=<your_supabase_url>
    SUPABASE_KEY=<your_supabase_key>
    JWT_SECRET=your_jwt_secret
    REDIS_URL=redis://localhost:6379 # Optional: Only if Redis is used for caching
    DATABASE_URL=your_supabase_database_url
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    EMAIL_USER=your_email@example.com
    EMAIL_PASSWORD=your_email_password
    APP_URL=https://your-vercel-app-url.com
    ADMIN_CHAT_IDS=413553377,another_admin_chat_id_if_any
    ```

2. Set up your Supabase project and replace the placeholders in the `.env` file with your actual Supabase credentials.

#### Optional: Redis/PostgreSQL Setup
1. If you prefer using PostgreSQL with Prisma and Redis, copy the `.env.redis_pg` file to `.env`:

    ```bash
    cp .env.redis_pg .env
    ```

2. Modify the `DATABASE_URL`, `REDIS_URL`, and `JWT_SECRET` values to match your local setup, and swap controller files:
    backend/src/controllers/bookController.ts (for Supabase)
    backend/src/controllers/bookController-postgres.ts (for PostgreSQL with Redis)
    backend/src/controllers/userController.ts (for Supabase)
    backend/src/controllers/userController-postgres.ts (for PostgreSQL with Redis)

3. Ensure prisma/schema.prisma and the database are properly set up by running:

    ```bash
    npx prisma migrate dev
    ```
### 4. Running the Project

#### Redis/PostgreSQL Optional Configuration

If you need to use Redis and local PostgreSQL, update your `.env` with `DATABASE_URL` and `REDIS_URL`. This setup is optional and can be used instead of Supabase. The associated files are kept in the project but marked as "optional."

#### Backend
1. **With Supabase:**
   ```bash
   cd backend
   npm run dev
   ```

2. **With Redis/PostgreSQL (Optional):**
   1. Ensure your PostgreSQL and Redis services are running.
   2. Run Prisma migrations:
      ```bash
      npx prisma migrate dev
      ```
   3. Start the backend:
      ```bash
      npm run dev
      ```

#### Frontend
```bash
cd frontend
npm start
```

- **Deploy to Vercel** (Optional):
   - Follow the Vercel setup instructions for both backend and frontend.
   - Ensure you have proper vercel.json configurations in both directories.

### 5. Deployment

#### Vercel
- The project is configured for Vercel deployment. Just link your repository and Vercel should automatically detect the `vercel.json` files in both `backend/` and `frontend/` directories.

### Telegram Integration
- Telegram users can register and log in using their Telegram account
- To become an admin, a user can click "Become Admin" on the frontend.
- Current admins receive a Telegram message to approve new admin requests.

### Email Workflow
- Users registering via email will receive a verification email.
- The email contains a link to confirm their registration.
- After logging in, non-admin users can request to become an admin, triggering a Telegram notification to current admins for confirmation.

### Switching Between Supabase and Redis/PostgreSQL
- **Default:** The project uses Supabase for database management.
- **Switching to Redis/PostgreSQL:** Update the `.env` file to use the PostgreSQL URL and configure Redis as needed.

### Optional: Redis/PostgreSQL Setup
- This project supports Redis for caching and PostgreSQL for data management.
- To use this setup, ensure PostgreSQL and Redis are installed and configured locally. Then update your `.env` file accordingly and run Prisma migrations.

### License
This project is licensed under the MIT License.

### Security Note

For production, ensure to generate a secure JWT secret:
```bash
openssl rand -base64 32
```

### Further Notes

- **Admin Registration**: Admins are confirmed via Telegram. Non-admin users can request to become admins, which current admins must approve via a confirmation link sent through Telegram.
- **Telegram Integration**: Telegram login and admin status notifications are handled through Telegram Bot API. Ensure the bot token and chat IDs are properly configured.
