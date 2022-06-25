import log4js from "log4js";

log4js.configure({
    appenders: {
        console: {type: "console"},
        error: {
            type: "file",
            filename: "logs/error.log",
            maxLogSize: 10485760,
            backups: 3,
            compress: true,
        },
        warn: {
            type: "file",
            filename: "logs/warn.log",
            maxLogSize: 10485760,
            backups: 3,
            compress: true,
        },
        errorFilter: {
            type: "logLevelFilter",
            appender: "error",
            level: "error",
            maxLevel: "error",
        },
        warnFilter: {
            type: "logLevelFilter",
            appender: "warn",
            level: "warn",
            maxLevel: "warn",
        },
    },
    categories: {
        default: {
            appenders: ["console", "errorFilter", "warnFilter"],
            level: "info",
        },
    },
});

export default log4js.getLogger();
