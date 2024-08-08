// module.exports = (sequelize, Sequelize) => {
//   const Tutorial = sequelize.define("tutorial", {
//     title: {
//       type: Sequelize.STRING,
//     },
//     description: {
//       type: Sequelize.STRING,
//     },
//     published: {
//       type: Sequelize.BOOLEAN,
//     },
//   });

//   return Tutorial;
// };

module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
    title: {
      type: Sequelize.STRING,
    },
    subTitle: {
      type: Sequelize.STRING,
    },
    tag: {
      type: Sequelize.STRING,
    },
    authorName: {
      type: Sequelize.STRING,
    },
    authorDescription: {
      type: Sequelize.STRING,
    },
    authorPhotoLocation: {
      type: Sequelize.STRING,
    },
    posterPhotoLocation: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    timeOfReading: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    readsCount: {
      type: Sequelize.INTEGER,
    },
    html: {
      type: Sequelize.STRING,
    },
  });

  return News;
};
