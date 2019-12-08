module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image", // table 이름 images 로 생성
    {
      src: {
        type: DataTypes.STRING(200), //20글자 이하
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  Image.associate = db => {
    db.Image.hasMany(db.Post);
  };

  return Image;
};
