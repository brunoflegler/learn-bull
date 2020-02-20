require('dotenv').config()
const bull = require('bull')
const { delay } = require('bluebird')

const queue = new bull('balance-operations', {
  redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST
  }
})

queue.process(10, async (job) => {
  return doSomething(job);
})

const doSomething = (job) => {
  if(job.data.object_id % 2 === Math.floor(Math.random() * 2)){
   throw new Error('some unexpected error');
  }
  return delay(1000)
}
