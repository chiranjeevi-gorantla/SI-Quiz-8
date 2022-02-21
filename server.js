const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { check, validationResult } = require("express-validator");
const { getConnection } = require("./helper");
const OPTIONS = {
    "definition": {
      "openapi": "3.0.0",
      "info": {
        "title": "Swagger Express Excercise API Reference",
        "version": "1.0.0",
        "description": "A Simple Express Swagger API",
        "termsOfService": "http://example.com/terms/",
        "contact": {
          "name": "chiranjeevi-gorantla",
          "url": "https://github.com/chiranjeevi-gorantla",
          "email": "chiranjeevigorantla@gmail.com"
        }
      },
  
      "servers": [
        {
          "url": "http://143.198.132.170:3000/",
          "description": "Swagger Express API Documentation"
        }
      ]
    },
    "apis": ["./*.js"]
  }
const PORT = process.env.PORT || 3000;
const app = express();
const specs = swaggerJsDoc(OPTIONS);

app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         NAME:
 *           type: string
 *         TITLE:
 *           type: string
 *         CLASS:
 *           type: string
 *         SECTION:
 *           type: string
 *         ROLLID:
 *           type: decimal
 */

/**
 * @swagger
 * /student:
 *   post:
 *     summary: Insert a student
 *     tags: [student]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  NAME:
 *                    type: string
 *                    example: Chiranjeevi
 *                  TITLE:
 *                    type: string
 *                    example: Gorantla
 *                  CLASS:
 *                    type: string
 *                    example: V
 *                  SECTION:
 *                    type: string
 *                    example: C
 *                  ROLLID:
 *                    type: number
 *                    example: 47
 *     responses:
 *       200:
 *         description: Succesfully inserted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not insert
 */
app.post("/student", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("INSERT INTO student (NAME, TITLE, CLASS, SECTION, ROLLID) VALUES (?,?,?,?,?,?);",
          [body.NAME, body.TITLE, body.CLASS, body.SECTION, body.ROLLID])
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Returns the list of all the students
 *     tags: [student]
 *     responses:
 *       200:
 *         description: The list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not get students
 */
  app.get("/student", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query("SELECT * from student")
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /student:
 *   put:
 *     summary: Update a student
 *     tags: [student]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  TITLE:
 *                    type: string
 *                    example: Chiran
 *                  SECTION:
 *                    type: string
 *                    example: A
 *                  ROLLID:
 *                    type: number
 *                    example: 47
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */
app.put("/student", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE student SET TITLE = ?, SECTION = ? WHERE ROLLID = ?",
          [body.TITLE, body.SECTION, body.ROLLID])
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /student:
 *   patch:
 *     summary: Update a student
 *     tags: [student]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CLASS:
 *                    type: string
 *                    example: X
 *                  SECTION:
 *                    type: string
 *                    example: D
 *                  ROLLID:
 *                    type: number
 *                    example: 47
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */
app.patch("/student", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE student SET CLASS = ?, SECTION = ? WHERE ROLLID = ?",
          [body.CLASS, body.SECTION, body.ROLLID])
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Deletes a student with specified id
 *     tags: [student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 47
 *         required: true
 *         description: id that needs to be deleted
 *     responses:
 *       200:
 *         description: Succesfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not delete
 */

app.delete("/student/id", (req, res) => {
    let id = req.params.id;
    getConnection()
      .then((conn) => {
        conn
          .query("DELETE FROM student WHERE ROLLID = ?",id)
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.get("/orders", (req, res) => {
  getConnection()
    .then((conn) => {
      conn
        .query("SELECT * from orders")
        .then((rows) => {
            conn.release();
            return res.json(rows);
        })
        .catch((err) => {
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/listofitem/:id", (req, res) => {
  var id = req.params.id;
  getConnection()
    .then((conn) => {
      conn
        .query(`SELECT * from listofitem where ITEMCODE = ?`, id)
        .then((rows) => {
            conn.release();
            return res.json(rows);
        })
        .catch((err) => {
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/agents", (req, res) => {
  var city = req.query.city;
  getConnection()
    .then((conn) => {
      conn
        .query(`SELECT * from agents where WORKING_AREA = ?`, city)
        .then((rows) => {
            conn.release();
            return res.json(rows);
        })
        .catch((err) => {
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/company", (req, res) => {
    var name = req.query.name;
    getConnection()
      .then((conn) => {
        conn
          .query(`SELECT * from company where COMPANY_NAME = ?`, name)
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));