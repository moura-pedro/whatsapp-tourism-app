const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define Schemas
const activitySchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  location: String,
  availability: String,
  image_url: String,
});

const userSchema = new mongoose.Schema({
  phone_number: String,
  preferences: {
    budget: Number,
    activity_type: String,
  },
});

const bookingSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  activity_id: mongoose.Schema.Types.ObjectId,
  status: String,
  payment_status: String,
  qr_code: String,
});

// Define Models
const Activity = mongoose.model('Activity', activitySchema);
const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Generate Dummy Data
const generateDummyData = async () => {
  // Clear existing data
  await Activity.deleteMany();
  await User.deleteMany();
  await Booking.deleteMany();

  // Populate Activities
  const activities = [];
  for (let i = 0; i < 10; i++) {
    activities.push({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price(),
      location: faker.location.streetAddress(),
      availability: `${faker.date.soon()} to ${faker.date.future()}`,
      image_url: faker.image.url(),
    });
  }
  const savedActivities = await Activity.insertMany(activities);

  // Populate Users
  const users = [];
  for (let i = 0; i < 5; i++) {
    users.push({
      phone_number: faker.phone.number(),
      preferences: {
        budget: faker.commerce.price(),
        activity_type: faker.commerce.department(),
      },
    });
  }
  const savedUsers = await User.insertMany(users);

  // Populate Bookings
  const bookings = [];
  for (let i = 0; i < 5; i++) {
    bookings.push({
      user_id: savedUsers[i % savedUsers.length]._id,
      activity_id: savedActivities[i % savedActivities.length]._id,
      status: 'confirmed',
      payment_status: 'paid',
      qr_code: 'base64-qr-code-string',
    });
  }
  await Booking.insertMany(bookings);

  console.log('Dummy data generated!');
  mongoose.connection.close();
};

generateDummyData();
