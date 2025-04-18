// src/app.ts
import express from 'express';
import regulationRoutes from './routes/regulationRoutes.js'; 

const app = express();
const PORT = process.env.REGULATION_PORT;

app.use(express.json());  
app.use('/api', regulationRoutes);  

app.listen(PORT, () => {
  console.log(`Regulation service en http://localhost:${PORT}`);
});
