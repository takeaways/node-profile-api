module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // table 이름 users 로 생성
    {
      nickname: {
        type: DataTypes.STRING(20), //20글자 이하
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true // 고유값
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      // 한글 입력가능
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );

  User.associate = db => {
    db.User.hasMany(db.Post, { as: "Post" }); // post로 값을 가저온다.
    db.User.hasMany(db.Comments);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId"
    }); // 다 대 다
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId"
    }); // 구별 용도
  };

  return User;
};

/**
 *
 * const user = {
 *  //as 는 사용자의 데이터를 가저오는 키값을 정의 하게 된다.
 *  Liked:[{},{},{}],
 *  Followers:[{},{},]
 * }
 *
 */
