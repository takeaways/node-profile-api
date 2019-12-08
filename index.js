const express = require("express");
const morgan = require("morgan");
const cookie_parser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");

const SocketServer = require("./socket");
const connect = require("./schema"); // mongo

const passport_config = require("./passport");
const user_router = require("./routes/user");
const db = require("./models");
db.sequelize.sync();

const app = express();
connect();
passport_config();

const sessionMiddleware = session({
  resave: true, //매번 세션 강제 저장
  saveUninitialized: false, // 빈 값도 저장
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, // js로 접근 불가능
    secure: false // https 를 사용하면 true
  },
  name: "gij"
});

//미들 웨어
app.use(morgan("dev"));
app.use(express.json()); //json
app.use(express.urlencoded({ extended: true })); // form
app.use(
  cors({
    origin: true,
    credentials: true
  })
); //cors Error Server 에서 처리필요
// 로그인 인증을 하기위해 쿠키 사용 (서버 -> 프론트 & 사용자 정보는 세션)
app.use(cookie_parser(process.env.COOKIE_SECRET)); //쿠키 암호화
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", user_router);

const server = app.listen(3001, () => {
  console.log(`${process.env.PORT || 3001} 포트로 연결되었습니다.`);
});

SocketServer(server, app, sessionMiddleware);

module.exports = server;
