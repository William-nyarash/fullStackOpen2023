const redis = require('./index');

const COUNTER_KEY = "todo_counter";

const incrementCounter = async () => {
  try {
    const current = await redis.getAsync(COUNTER_KEY);
    const count = current ? Number(current) : 0;

    const newCount = count + 1;
    await redis.setAsync(COUNTER_KEY, newCount);

    return newCount;
  } catch (error) {
    console.error("Failed to increment todo_counter:", error);
    throw error;
  }
};

const getCounter = async () => {
  try {
    const count = await redis.getAsync('todo_counter');

    return count ? Number(count) : 0;
  } catch (error) {
    console.error('Failed to get todo_counter', error);

    throw error;
  }
};


module.exports = {incrementCounter, getCounter};
