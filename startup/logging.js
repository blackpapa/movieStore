const winston = require("winston");

module.exports = function () {
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.prettyPrint()
    ),
    transports: [
      new winston.transports.File({ filename: "combined.log" }),
      new winston.transports.Console({ format: winston.format.simple() }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: "uncaughtexception.log" }),
      new winston.transports.Console(),
    ],
  });

  process.on("unhandledRejection", (err) => {
    throw err;
  });

  return logger;
};
