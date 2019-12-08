module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(30), // 매우 긴글
        allowNull: false
      }
    },
    {
      // 이모티콘 포함
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Hashtag.associate = db => {
    // n : m 관계는 중간에 관계를 연결해줄 테이블이 생성 through : PostHashtag
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
