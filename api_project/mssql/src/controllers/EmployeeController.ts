import { Router, Request, Response } from 'express';
import { getEmployees,insertEmployee } from '../db/employee';

export const employeeRouter = Router();

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: List of employees
 */
employeeRouter.get('/employees', async (req: Request, res: Response) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).send('Error fetching employees');
  }
});

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee IDs
 *     responses:
 *       200:
 *         description: Employee data
 *       404:
 *         description: Employee not found
 */
employeeRouter.get('/employees/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await getEmployees(id);

    if (result.length === 0) {
      return res.status(300).send('Employee not found');
    }

    res.json(result[0]);
  } catch (err) {
    console.error('Error fetching employee by ID:', err);
    res.status(500).send('Error fetching employee');
  }
});


/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Add a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               jobtitle:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 */

employeeRouter.post('/employees', async (req: Request, res: Response) => {
  try {

    console.log("------------------------");
    console.log(req.body);
    console.log("------------------------");

    const { firstname, lastname, jobtitle } = req.body;

    if (!firstname || !lastname) {
      return res.status(400).send('firstname and lastname are required');
    }

    const inserted = await insertEmployee(firstname, lastname,jobtitle);

    res.status(201).json({
      message: 'Employee created successfully',
      rowsAffected: inserted
    });
  } catch (err) {
    console.error('Error inserting employee:', err);
    res.status(500).send('Error inserting employee');
  }
});
