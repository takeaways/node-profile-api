const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");

router.get("/", (req, res, next) => {
  if (req.user) return res.json(req.user);
  next();
});

// 사용자 생성
router.post("/", async (req, res, next) => {
  try {
    const fined_user = await db.User.findOne({
      where: { userId: req.body.userId }
    });
    if (fined_user) {
      return res.status(403).json({ message: "이미 사용중인 아이디 입니다." });
    }
    const hashed_password = await bcrypt.hash(req.body.password, 12);
    const new_user = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashed_password
    });
    console.log(new_user);
    return res.json(new_user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//req.params.id
router.get("/:id", (req, res) => {});
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  console.log("Asd");
  return res.json({
    message: "로그아웃 했습니다."
  });
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      next(err);
    }
    if (info) {
      return res.status(401).json(info);
    }
    return req.login(user, login_error => {
      if (login_error) {
        next(login_error);
      }
      const filted_user = Object.assign({}, user.toJSON());
      delete filted_user.password;
      return res.json(filted_user);
    });
  })(req, res, next);
});
router.get("/:id/follow", (req, res) => {});
router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});
router.get("/:id/follow", (req, res) => {});

module.exports = router;
