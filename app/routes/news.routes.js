module.exports = (app) => {
  // const tutorials = require("../controllers/tutorial.controller.js");
  const news = require("../controllers/news.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", news.create);

  // Retrieve all Tutorials
  router.get("/", news.findAll);

  // Retrieve all published Tutorials
  router.get("/published", news.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", news.findOne); // добавити шоб повертало повідомлення якшо нічого не знайшло

  // Update a Tutorial with id
  router.put("/:id", news.update);

  // Delete a Tutorial with id
  router.delete("/:id", news.delete);

  // Delete all Tutorials
  router.delete("/", news.deleteAll);

  router.put("/set-published/:id", news.publish);
  router.put("/increment-reads/:id", news.incrementReadsCount);

  app.use("/api/news", router);
};
