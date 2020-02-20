require('dotenv').config()
const bull = require('bull')

const queue = new bull('balance-operations', {
  redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST
  }
})

const send = () => {
  queue.add({
    object_type: 'balance_operations',
    object_id: Math.floor(Math.random() * 10000),
    created_at: new Date()
  },
  {
    delay: 50,
    attempts: 10
  })
}

const run = () => {
  send()
  setTimeout(run, 50)
}

run()
