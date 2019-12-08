const passport = require("passport");
const db = require("../models");
const local = require("./local");

let current_user = "";

module.exports = () => {
  //user의 id 값을 세션(서버)에 저장 (passport.log() 할 때 실행) [{id:1, cookie:"프론트로 보내는 쿠키"}]
  passport.serializeUser((user, done) => {
    return done(null, user.id); //id 만 저장
  });

  //실제로 데이터를 사용할 때 사용 시리얼 라이즈로 보낸 쿠키를 가지고 요청이 들어 오면 실행
  passport.deserializeUser(async (id, done) => {
    try {
      if (current_user && current_user.id === id) {
        return done(null, current_user);
      }
      console.log(">>>>>>> ", current_user, id);
      const user = await db.User.findOne({
        where: { id }
      });
      current_user = user;
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  local();
};

/*
프론트에서 서버로는 쿠키만 보낸다
-> 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사후 id : 1 발견
-> id :1 이 deserializeUser에 들어간다.
-> req.user로 사요자 정보가 들어 간다

*/
