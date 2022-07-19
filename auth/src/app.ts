import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import { transports, format } from "winston";
import { LoggerOptions, logger } from "express-winston";
import debug from "debug";
import "express-async-errors";
import { NotFoundError } from "./common/errors/not-found-error";
import { errorHandler } from "./common/middleware/error-handler";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
const debugLog: debug.IDebugger = debug("app");

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);

// Log
const loggerOptions: LoggerOptions = {
  transports: [new transports.Console()],
  format: format.combine(
    format.json(),
    format.prettyPrint(),
    format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(logger(loggerOptions));

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Middlewares
app.use(errorHandler);

export { app };
