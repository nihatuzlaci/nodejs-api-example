const http = require("http");

const app = require("./app");

require("dotenv").config();

const { mongoConnect } = require("./services/mongo");

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

async function startServer() {
  await mongoConnect(process.env.MONGO_URL);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
