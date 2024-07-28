const db = require("../models");
// const Tutorial = db.tutorials;
const News = db.news;
const Op = db.Sequelize.Op;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// exports.create = (req, res) => {
//   upload.single("photo")(req, res, function (err) {
//     if (err) {
//       return res.status(500).send({
//         message: "Error uploading file.",
//       });
//     }

//     // Validate request
//     if (!req.body.title) {
//       return res.status(400).send({
//         message: "Content can not be empty!",
//       });
//     }

//     // Create a News
//     const News = {
//       title: req.body.title,
//       description: req.body.description,
//       published: req.body.published ? req.body.published : false,
//       photo: req.file ? req.file.filename : null,
//     };

//     // Save News in the database
//     News.create(News)
//       .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the News.",
//         });
//       });
//   });
// };

// Create and Save a new News
exports.create = (req, res) => {
  upload.single("photo")(req, res, (err) => {
    if (err) {
      return res.status(500).send({
        message: "Error uploading file.",
      });
    }

    // Validate request
    if (!req.body.title) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    // Create a News
    const news = {
      title: req.body.title,
      subTitle: req.body.subTitle,
      tag: req.body.tag,
      authorName: req.body.authorName,
      authorDescription: req.body.authorDescription,
      authorPhotoLocation: req.file ? req.file.filename : null,
      date: req.body.date,
      timeOfReading: req.body.timeOfReading,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
      readsCount: 0,
      html: req.body.html,
    };

    // Save News in the database
    News.create(news)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the News.",
        });
      });
  });
};

// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.title) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//     return;
//   }

//   // Create a Tutorial
//   const tutorial = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false,
//   };

//   // Save Tutorial in the database
//   News.create(tutorial)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial.",
//       });
//     });
// };

// Retrieve all Newss from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // News.findAll({ where: condition })
  News.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Newss.",
      });
    });
};

// Find a single News with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  News.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving News with id=" + id,
      });
    });
};

// Update a News by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  News.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating News with id=" + id,
      });
    });
};

// Delete a News with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  News.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete News with id=" + id,
      });
    });
};

// Delete all Newss from the database.
exports.deleteAll = (req, res) => {
  News.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Newss were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Newss.",
      });
    });
};

// find all published News
exports.findAllPublished = (req, res) => {
  News.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Newss.",
      });
    });
};

// Publish a News by setting published to true
exports.publish = (req, res) => {
  const id = req.params.id;

  News.update(
    { published: true },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num[0] === 1) {
        res.send({
          message: "News was published successfully.",
        });
      } else {
        res.send({
          message: `Cannot publish News with id=${id}. Maybe News was not found or it is already published!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error publishing News with id=" + id,
      });
    });
};

// Increment readsCount by 1
exports.incrementReadsCount = (req, res) => {
  const id = req.params.id;

  News.findByPk(id)
    .then((news) => {
      if (!news) {
        return res.status(404).send({
          message: `News with id=${id} not found!`,
        });
      }

      news
        .increment("readsCount")
        .then(() => {
          res.send({
            message: "Reads count incremented successfully.",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error incrementing reads count for News with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving News with id=" + id,
      });
    });
};
