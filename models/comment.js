module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
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
  Comment.associate = db => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
