import express from 'express';
import { createAudit, getAudits } from '../controllers/auditController.js';
import { validate } from 'middlewares/validate.js';
import { AuditSchema } from '../schemas/auditSchemas.js';

const router = express.Router();

router.post('/create', validate(AuditSchema), createAudit);
router.get('/', getAudits);

export default router;