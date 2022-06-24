const http = require("http");

require("dotenv").config();

const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
