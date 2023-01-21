const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

module.exports = function () {
  mongoose.connect(
    //`mongodb+srv://ddreg:Yellow%232424@cluster0.5fnqt.mongodb.net/DDRHR`,
     `mongodb+srv://ddreg:Yellow%232424@cluster0.5fnqt.mongodb.net/DD-HR?authSource=admin&replicaSet=atlas-r1tg28-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
      // `mongodb+srv://ddreg:Yellow%232424@cluster0.5fnqt.mongodb.net/test?authSource=admin&replicaSet=atlas-r1tg28-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
    //`mongodb+srv://ddreg:rLdSgOWzRGkMq0yq@cluster0.rzjx1.mongodb.net/DDRHR?retryWrites=true&w=majority`,
 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  );

  mongoose.connection.on("connected", () => {
    console.log("db connected");
  });
};
