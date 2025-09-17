import express from 'express';
import { employeeRouter } from '../controllers/EmployeeController';
import { setupSwagger } from '../swagger';

const app = express();
const PORT = 9092;

app.use(express.json());

app.use('/', employeeRouter);
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
});