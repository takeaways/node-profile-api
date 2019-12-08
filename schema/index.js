const mongoose = require("mongoose");
const { MOGNO_ID, MONGO_PW, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MOGNO_ID}:${MONGO_PW}@localhost:27017/admin`;

module.exports = () => {
  const connect = () => {
    mongoose.connect(
      MONGO_URL,
      {
        dbName: "gichat"
      },
      error => {
        if (error) {
          console.log("몽고 연결 에러! : ", error);
        } else {
          console.log("몽고 연결성공");
        }
      }
    );
  };
  connect();

  mongoose.connection.on("error", error => {
    console.log("몽고디비 연결 에러 ", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
    connect();
  });

  require("./chat");
  require("./room");
};
