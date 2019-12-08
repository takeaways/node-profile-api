module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT, // 매우 긴글
        allowNull: false
      }
    },
    {
      // 이모티콘 포함
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User); // 사용자 한테 속해 있다.
    db.Post.hasMany(db.Comment); // 댓글을 많이 가지고 있다.
    db.Post.belongsTo(db.Post, { as: "Retweet" });
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Post;
};
