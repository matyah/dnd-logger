import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import { transports, format } from "winston";
import { LoggerOptions, logger } from "express-winston";
import debug from "debug";
import "express-async-errors";
import { NotFoundError } from "@matyah/dnd-logger-common";
import { errorHandler } from "@matyah/dnd-logger-common";

const app = express();
const debugLog: debug.IDebugger = debug("app");

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
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

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Middlewares
app.use(errorHandler);

export { app };
