import app from './app';

const port = process.env.PORT || 3333;
/**
 * Starts the Express server on the specified port.
 *
 * @constant
 * @type {import('http').Server}
 */
const server = app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}/api/users`);
});
/**
 * Handles server-level errors by logging them to the console.
 *
 * @event error
 * @param {Error} error - The error object emitted by the server
 */
server.on('error', console.error);
