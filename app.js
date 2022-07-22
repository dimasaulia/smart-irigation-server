if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const expbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const ROUTER = require("./router");
const cookieParser = require("cookie-parser");

app.io = io;
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use("/", ROUTER);
app.engine(
    "handlebars",
    expbs.engine({ extname: ".hbs", defaultLayout: "base" })
);
app.set("views", "views");
app.set("view engine", "handlebars");

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
        console.log("A client disconnected");
    });
});

http.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
