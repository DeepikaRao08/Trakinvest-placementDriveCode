"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = exports.EmployeeService = void 0;
const pg_1 = __importDefault(require("./util/pg"));
class EmployeeService {
    getAll(req, res, next) {
        pg_1.default.query(`SELECT * From "Employee" order by "empName"`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went Wrong!"
                });
            }
            else {
                if (results.rows.length == 0) {
                    res.status(404).json({
                        error: "Employees not found!"
                    });
                }
                else {
                    res.status(200).json(results.rows);
                }
            }
        });
    }
    getById(req, res, next) {
        let id = req.params.id;
        pg_1.default.query(`SELECT "Employee".*, "deptName" FROM "Employee", "Department" where "Employee"."id" = ${id} and "deptId" = "Department"."id"`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went Wrong!"
                });
            }
            else {
                if (results.rows.length == 0) {
                    res.status(404).json({
                        error: "Employee not found!"
                    });
                }
                else {
                    res.status(200).json(results.rows[0]);
                }
            }
        });
    }
    add(req, res, next) {
        let { empName, phone, deptId } = req.body;
        pg_1.default.query('INSERT INTO "Employee" ("empName", "phone", "deptId") VALUES ($1, $2, $3)', [empName, phone, deptId], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went wrong!"
                });
            }
            else {
                res.status(201).send(`Employee added`);
            }
        });
    }
    update(req, res) {
        let data = req.body;
        let id = req.params.id;
        let cols = Object.keys(data);
        let query = `Update "Employee" set `;
        let queryArr = [];
        cols.forEach((col, i) => __awaiter(this, void 0, void 0, function* () {
            let dt = data[col];
            if (typeof dt == 'number') {
                queryArr.push(`"${col}" = ${dt}`);
            }
            else {
                queryArr.push(`"${col}" = '${dt}'`);
            }
        }));
        query += `${queryArr.join(',')} where id = ${id}`;
        pg_1.default.query(query, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went wrong!"
                });
            }
            else {
                res.status(200).send(`Employee Updated`);
            }
        });
    }
    delete(req, res) {
        let id = req.params.id;
        pg_1.default.query(`Delete from "Employee" where "id" = ${id}`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went wrong!"
                });
            }
            else {
                res.status(200).send(`Employee Deleted`);
            }
        });
    }
}
exports.EmployeeService = EmployeeService;
class DepartmentService {
    getAll(req, res, next) {
        pg_1.default.query(`SELECT * From "Department" order by "deptName"`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went Wrong!"
                });
            }
            else {
                if (results.rows.length == 0) {
                    res.status(404).json({
                        error: "Departments not found!"
                    });
                }
                else {
                    res.status(200).json(results.rows);
                }
            }
        });
    }
    getById(req, res, next) {
        let id = req.params.id;
        pg_1.default.query(`SELECT * FROM "Department" where "id" = ${id}`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went Wrong!"
                });
            }
            else {
                if (results.rows.length == 0) {
                    res.status(404).json({
                        error: "Department not found!"
                    });
                }
                else {
                    res.status(200).json(results.rows[0]);
                }
            }
        });
    }
    add(req, res, next) {
        let { deptName } = req.body;
        pg_1.default.query('INSERT INTO "Department" ("deptName") VALUES ($1)', [deptName], (error, results) => {
            if (error) {
                res.status(500).json({
                    error: "Something Went wrong!"
                });
                throw error;
            }
            res.status(201).send(`Department Created`);
        });
    }
    update(req, res) {
        let data = req.body;
        let id = req.params.id;
        if (data.deptName) {
            pg_1.default.query(`Update "Department" set "deptName" = '${data.deptName}' where id = ${id}`, (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({
                        error: "Something Went wrong!"
                    });
                }
                else {
                    res.status(200).send(`Department Updated`);
                }
            });
        }
        else {
            res.status(400).json({
                error: "nothing to update"
            });
        }
    }
    delete(req, res) {
        let id = req.params.id;
        pg_1.default.query(`Delete from "Department" where "id" = ${id}`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went wrong!"
                });
            }
            else {
                res.status(200).send(`Department Deleted`);
            }
        });
    }
}
exports.DepartmentService = DepartmentService;
