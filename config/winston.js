var appRoot = require('app-root-path');
var winston = require('winston');
// Определите пользовательские настройки для каждого транспорта (файл, консоль)(файл, консоль)
var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
// создать создание нового журнала Winston с настройками, определенными выше
var logger = new winston.Logger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // Не выходите на обработанные исключения
});
// Создайте объект потока с функцией «записать», которая будет использоваться «Morgan»
logger.stream = {
    write: function(message, encoding) {
// Используйте уровень журнала «Информация», чтобы выходной вывод был поднят обоим транспортом (файл и консоль)
    logger.info(message);
},
};
module.exports = logger;