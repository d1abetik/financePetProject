import cors from 'cors';
import express from 'express';
import router from './routes';

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/api', router)

//Обработка ошибок!!!
// app.use(errorHandler)

const start = async() => {
  try {
    app.listen(PORT, () => console.log(`initialized on port ${PORT}`))
  }catch(error) {
    console.log(error);
  }
}

start();
