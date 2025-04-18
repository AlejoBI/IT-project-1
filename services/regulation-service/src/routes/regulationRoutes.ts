import express, { Request, Response } from 'express';
import { getRegulations, getRegulation, addRegulation, updateRegulation, deleteRegulation } from '../controllers/regulationController.js';

const router = express.Router();

// Ruta para obtener todas las normativas 
router.get('/regulations', async (req: Request, res: Response) => {
  await getRegulations(req, res);
});

// Ruta para obtener una normativa específica
router.get('/regulations/:id', async (req: Request, res: Response) => {
  await getRegulation(req, res);
});

// Ruta para agregar una nueva normativa
router.post('/regulations', async (req: Request, res: Response) => {
  await addRegulation(req, res);
});

// Ruta para actualizar una normativa
router.put('/regulations/:id', async (req: Request, res: Response) => {
  await updateRegulation(req, res);
});

// Ruta para eliminar una normativa
router.delete('/regulations/:id', async (req: Request, res: Response) => {
  await deleteRegulation(req, res);
});

export default router;
