const { logEvents } = require('./logEvents');

function errorHandler(err, req, res, next) {
  logEvents(`${err.name} ${err.message}`, 'errLog.txt');
  console.log('Error: ', err.stack);
  res.status(500).send(err.message);
}

module.exports = { errorHandler };
