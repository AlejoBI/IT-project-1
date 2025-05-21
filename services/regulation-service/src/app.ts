import express, { Request, Response } from "express";
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

// Ruta de salud (para healthcheck de Docker)
app.get("/health", (_req: Request, res: Response): any =>
  res.status(200).send("OK")
);

// Error handling genérico opcional (recomendado)
app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Regulation service en http://localhost:${PORT}`);
});
