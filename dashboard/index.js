require('dotenv').config()

const bull = require('bull')
const { setQueues, UI } = require('bull-board')
const Arena = require('bull-arena')
const app = require('express')()


//bull-board
const queue = new bull('balance-operations', {
  redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST
  }
})

setQueues([queue])

app.use('/ui', UI)
//---

//bull-arena
const arena = Arena({
  queues: [
    {
      name: "balance-operations",
      hostId: "queue-bo",
      redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
      },
    },
  ],
})

app.use('/', arena)

app.listen(process.env.PORT, () => {
  console.log(`View the website at: http://localhost:${process.env.PORT_PUBLIC}`)
})