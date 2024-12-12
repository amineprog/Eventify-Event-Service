import { connect, Model, Schema } from 'mongoose';
import { faker } from '@faker-js/faker';

// Define the Event Schema
const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
});

async function seedData() {
  const connection = await connect('mongodb://localhost:27018/event-service');
  const Event: Model<any> = connection.model('Event', EventSchema);

  const events = Array.from({ length: 50 }).map(() => ({
    name: faker.company.name(),
    date: faker.date.future(),
    location: faker.location.city(),
    description: faker.lorem.paragraph(),
  }));

  try {
    await Event.insertMany(events);
    console.log('Dummy events inserted!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.disconnect();
    process.exit(0);
  }
}

seedData();
