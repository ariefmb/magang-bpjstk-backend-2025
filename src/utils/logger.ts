import moment from "moment";
import pino from "pino";
import pretty from "pino-pretty";

const logger = pino(
    {
        base: {
            pid: false,
        },
        timestamp: () => `,"time":"${moment().format()}"`,
    },
    pretty()
);

export default logger;
