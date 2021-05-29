import express from 'express';
import { DepartmentService, EmployeeService } from "./service";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/hello', (req, res, next) => {
    res.json({
        message: "Sever Working!!"
    });
});

const emp = new EmployeeService();
const dept = new DepartmentService();

app.get('/emp', emp.getAll);
app.get('/emp/:id', emp.getById);
app.post('/emp', emp.add);
app.patch('/emp/:id', emp.update);
app.delete('/emp/:id', emp.delete);

app.get('/dept', dept.getAll);
app.get('/dept/:id', dept.getById);
app.post('/dept', dept.add);
app.patch('/dept/:id', dept.update);
app.delete('/dept/:id', dept.delete);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    return console.info(`Server is listening on port: ${PORT}`);
});