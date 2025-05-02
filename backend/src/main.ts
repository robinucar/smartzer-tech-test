import app from './app';

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}/api/users`);
});
server.on('error', console.error);
