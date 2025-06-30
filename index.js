import 'dotenv/config'
import "newrelic";
import express from "express";
import winston from "winston";

const PORT = process.env.PORT || 3000;
const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

app.get("/", (req, res) => {
	logger.info("Test Info: / route was hit");
	if (Math.random() < 0.5) {
		logger.error("Test Error: Math.random() < 0.5");
	}
	res.json({message: "Hi There"}) 
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
