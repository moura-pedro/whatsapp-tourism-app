const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  location: String,
  contactDetails: String,
  availability: [String], // Example: ['Morning', 'Afternoon', 'Evening']
  imageUrl: String,
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
