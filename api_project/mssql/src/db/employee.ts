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

export async function insertEmployee(name: string, lastname: string, jobtitle: string) {
  const pool = await connectDB();
  const request = pool.request();

  request.input('FirstName', name);
  request.input('LastName', lastname);
  request.input('JobTitle', jobtitle);

  const result = await request.query(`
    INSERT INTO Employee (FirstName,LastName,JobTitle)
    OUTPUT INSERTED.EmployeeID
    VALUES (@FirstName, @LastName, @JobTitle);
  `);

  // result.recordset[0].EmployeeID will contain the new ID
  return {
    id: result.recordset[0].EmployeeID,
    name,
    lastname,
    jobtitle
  };
}