const thing = (sequelize, DataTypes) => {
  const Thing = sequelize.define('thing', {
    title: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
  });

  return Thing;
};

export default thing;
