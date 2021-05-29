"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = require("./service");
const app = express_1.default();
app.use(express_1.default.json());
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
const emp = new service_1.EmployeeService();
const dept = new service_1.DepartmentService();
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
