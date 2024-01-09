require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const useRouter = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const User = require("./api/model/User");
const EvcPlus = require("./api/model/EvcPlus");
const SomtelCLient = require("./api/model/Somtel");
const Notifications = require("./api/model/Notification");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", useRouter);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

app.use(notFound);
app.use(errorHandler);
// create  http Server
const server = http.createServer(app);

// create socket io server
const io = require("socket.io")(server);

// create connection
io.on("connection", async (client) => {
  // find or update device by client
  console.log({
    id: client.id,
    loggined: new Date().toString(),
    device: client.handshake.query.id,
  });
  const user = await new User(
    client.id,
    client.handshake.query.id,
    "online"
  ).Connect();
  if (user == "not") {
    io.to(client.id).emit("regback", "not");
  } else {
    io.to(client.id).emit("regback", user);

    // evc plus sms only
  client.on("hormuud", async (data) => {
    io.to(client.id).emit("rese", await new EvcPlus(client.id, data).Get());
  });
  // reseller responce ussd only
  client.on("reseller", async (data) => {
    io.to(client.id).emit(
      "resr",
      await new SomtelCLient(client.id, data).Reseller()
    );
    console.log(data);
  });
  // dhammeys response already and trying to add extra time
  client.on("waiting", async (data) => {
    io.to(client.id).emit(
      "resw",
      await new SomtelCLient(client.id, data).Waiting()
    );
  });

  client.on("check", async (data) => {
    io.to(client.id).emit("resn", await new Notifications(client.id).Get());
  });

  
  }

  

  // set offline after user disconnect
  client.on("disconnect", async () => {
    await new User(client.id, "", "offline").Disconnect();
    console.log("disconnected id : " + client.id);
  });
  client.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

server.listen(port, () => console.log("Server Runing at Port " + port));
