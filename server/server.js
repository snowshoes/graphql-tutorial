import express from "express";

const PORT = 4000;

const server = express();

server.get("/", function(req, res) {
  res.send("Hello There I am Apollo Server");
});

server.listen(PORT, () =>
  console.log(`GraphQL server now is running on http://localhost:${PORT}`)
);
