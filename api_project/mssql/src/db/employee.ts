import { connectDB } from '../db/connect';

export async function getEmployees(id?: number) {
  const pool = await connectDB();

  let query = 'SELECT TOP 10 * FROM Employee';
  if (id) {
    query = 'SELECT * FROM Employee WHERE EmployeeID = @ID';
  }

  const request = pool.request();
  if (id) {
    request.input('ID', id);
  }

  const result = await request.query(query);
  return result.recordset;
}

export async function insertEmployee(name: string, position: string) {
  const pool = await connectDB();

  const request = pool.request();
  request.input('Name', name);
  request.input('Position', position);

  const result = await request.query(`
    INSERT INTO Employee (Name, Position)
    VALUES (@Name, @Position)
  `);

  return result.rowsAffected[0]; // returns number of inserted rows (1 if success)
}
