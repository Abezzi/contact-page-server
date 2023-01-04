import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import * as morgan from "morgan";
import { Routes } from "./routes";
import { port } from "./config";
import { validationResult } from "express-validator/src/validation-result";

// middleware function
function handleError(err, req, res, next) {
  res.status(err.statusCode || 500).send({ message: err.message });
}

// create express app
const app = express();

// morgan (API Logging)
app.use(morgan("tiny"));

app.use(bodyParser.json());

// register express routes from defined application routes
Routes.forEach((route) => {
  (app as any)[route.method](
    route.route,
    ...route.validation,
    async (req: Request, res: Response, next: Function) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const result = await new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        res.json(result);
      } catch (error: any) {
        next(error);
        console.log(error);
      }
    }
  );
});
// handle errors
app.use(handleError);

console.log(`Express server has started on port ${port}.`);

export default app;