import db from "./util/pg";

interface Employee {
    id?: number;
    empName?: string;
    deptId?: number | null;
}

interface Department {
    id?: number;
    deptName?: string;
}

export class EmployeeService {

    getAll(req, res, next) {
        db.query(`SELECT * From "Employee" order by "empName"`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went Wrong!"
                });
            } else {
                if (results.rows.length == 0) {
                    res.status(404).json({
                        error: "Employees not found!"
                    });
                } else {
                    res.status(200).json(results.rows);
                }
            }
        });
    }

    getById(req, res, next) {
        let id = req.params.id;
        db.query(`SELECT "Employee".*, "deptName" FROM "Employee", "Department" where "Employee"."id" = ${id} and "deptId" = "Department"."id"`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went Wrong!"
                });
            } else {
                if (results.rows.length == 0) {
                    res.status(404).json({
                        error: "Employee not found!"
                    });
                } else {
                    res.status(200).json(results.rows[0]);
                }
            }
        });
    }

    add(req, res, next) {
        let { empName, phone, deptId } = req.body;

        db.query('INSERT INTO "Employee" ("empName", "phone", "deptId") VALUES ($1, $2, $3)', [empName, phone, deptId], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went wrong!"
                });
            } else {
                res.status(201).send(`Employee added`);
            }
        })
    }

    update(req, res) {
        let data = req.body;
        let id = req.params.id;

        let cols: string[] = Object.keys(data);
        let query = `Update "Employee" set `;
        let queryArr: any = [];
        cols.forEach(async (col, i) => {
            let dt: any = data[col];
            if (typeof dt == 'number') {
                queryArr.push(`"${col}" = ${dt}`);
            } else {
                queryArr.push(`"${col}" = '${dt}'`);
            }
        });
        query += `${queryArr.join(',')} where id = ${id}`;
        db.query(query, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went wrong!"
                });
            } else {
                res.status(200).send(`Employee Updated`);
            }
        });
    }

    delete(req, res) {
        let id = req.params.id;

        db.query(`Delete from "Employee" where "id" = ${id}`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went wrong!"
                });
            } else {
                res.status(200).send(`Employee Deleted`);
            }
        });
    }

}

export class DepartmentService {

    getAll(req, res, next) {
        db.query(`SELECT * From "Department" order by "deptName"`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went Wrong!"
                });
            } else {
                if (results.rows.length == 0) {
                    res.status(404).json({
                        error: "Departments not found!"
                    });
                } else {
                    res.status(200).json(results.rows);
                }
            }
        });
    }

    getById(req, res, next) {
        let id = req.params.id;
        db.query(`SELECT * FROM "Department" where "id" = ${id}`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went Wrong!"
                });
            } else {
                if (results.rows.length == 0) {
                    res.status(404).json({
                        error: "Department not found!"
                    });
                } else {
                    res.status(200).json(results.rows[0]);
                }
            }
        });
    }

    add(req, res, next) {
        let { deptName } = req.body;

        db.query('INSERT INTO "Department" ("deptName") VALUES ($1)', [deptName], (error, results) => {
            if (error) {
                res.status(500).json({
                    error: "Something Went wrong!"
                });
                throw error;
            }
            res.status(201).send(`Department Created`)
        })
    }

    update(req, res) {
        let data = req.body;
        let id = req.params.id;

        if (data.deptName) {
            db.query(`Update "Department" set "deptName" = '${data.deptName}' where id = ${id}`, (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({
                        error: "Something Went wrong!"
                    });
                } else {
                    res.status(200).send(`Department Updated`);
                }
            });
        } else {
            res.status(400).json({
                error: "nothing to update"
            });
        }
    }

    delete(req, res) {
        let id = req.params.id;

        db.query(`Delete from "Department" where "id" = ${id}`, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: "Something Went wrong!"
                });
            } else {
                res.status(200).send(`Department Deleted`);
            }
        });
    }

}