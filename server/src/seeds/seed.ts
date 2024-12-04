import db from '../config/connection.js';
import { Question } from '../models/index.js';
import cleanDB from './cleanDb.js';
import fs from 'fs/promises'; // Import the 'fs/promises' module for dynamic file reads

try {
  await db();
  await cleanDB();

  // Dynamically load JSON data
  const data = await fs.readFile(new URL('./pythonQuestions.json', import.meta.url), 'utf8');
  const questionData = JSON.parse(data);

  // Bulk create each model
  await Question.insertMany(questionData);

  console.log('Seeding completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}

