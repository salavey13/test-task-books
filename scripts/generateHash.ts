import * as bcrypt from 'bcryptjs';

const saltRounds = 10;
const password = 'password123';

bcrypt.hash(password, saltRounds, (err: Error | null, hash: string) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('Hashed password:', hash);
});
