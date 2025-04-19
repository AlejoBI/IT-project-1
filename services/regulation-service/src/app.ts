import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import regulationRoutes from './routes/regulationRoutes.js'; 

dotenv.config(); 

const app = express();
const PORT = process.env.REGULATION_PORT;

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use('/api/regulations', regulationRoutes);  

app.listen(PORT, () => {
  console.log(`Regulation service en http://localhost:${PORT}`);
});
