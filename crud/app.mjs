import express from 'express'
import router from './routes/routes.mjs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const app = express()

dotenv.config()
const port=process.env.PORT
//body parser
app.use(express.json())

main().catch(err => console.log(err));

async function main() {
   
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
console.log("db connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})