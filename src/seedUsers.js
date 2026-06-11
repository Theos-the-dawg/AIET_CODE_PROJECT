require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/users');

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Cluster0';

const seedUsers = [
  {
    username: 'alice',
    email: 'alice@example.com',
    password: 'password123'
  },
  {
    username: 'bob',
    email: 'bob@example.com',
    password: 'password123'
  }
];

async function main() {
  try {
    await mongoose.connect(mongoURI);
    console.log(`Connected to MongoDB`);

    for (const userData of seedUsers) {
      const existingUser = await User.findOne({
        $or: [{ email: userData.email }, { username: userData.username }]
      });

      if (existingUser) {
        console.log(`Skipping existing user: ${userData.username}`);
        continue;
      }

      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.username} (${user.email})`);
    }

    console.log('Seeding complete.');
  } catch (error) {
    console.error('Failed to seed users:', error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
