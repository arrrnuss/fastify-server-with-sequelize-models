const fastify = require("fastify")({
    logger: {
      level: "info",
    },
  });
  
  const { sequelize, models } = require('./db');
  fastify.decorate('models', models);
  
  
  const fastifyEnv = require("@fastify/env");
  const { v4: uuidv4 } = require("uuid");
  const path = require("path");
  const AutoLoad = require("@fastify/autoload");
  const fg = require("fast-glob");
  const fastifyCors = require("fastify-cors"); // Import fastify-cors
  const Sequelize = require('sequelize');
  
  
  const options = {};
  const initialize = async () => {
    fastify.decorate("fg", fg);
    fastify.decorate("uuid", uuidv4);
  
    await fastify.after();
  
    fastify.register(AutoLoad, {
      dir: path.join(__dirname, "plugins"),
    });
  
    fastify
      .register(AutoLoad, {
        dir: path.join(__dirname, "routes"),
        dirNameRoutePrefix: function rewrite(folderParent, folderName) {
          if (folderName === "v1") {
            return "api/";
          }
          return folderName;
        },
      })
      .after(async () => {
        console.log(fastify.config);
      });
  };
  
  initialize().catch((err) => console.log(err));
  
  // Register fastify-cors as a plugin
  fastify.register(fastifyCors, {
    origin: "*", // Set the allowed origin, replace with your specific origin or options
    methods: ["GET", "PUT", "POST", "DELETE"], // Set allowed HTTP methods
  });
  
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
  
  fastify.ready((err) => {
    if (err) console.log(err); 
  
  
    fastify.listen({ port: 3000 }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening on 127`);
    });
  
  
  });
  