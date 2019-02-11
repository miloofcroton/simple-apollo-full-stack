const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
  });

  return Item;
};

export default item;
