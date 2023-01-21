const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
     role: { type: String, required: true },
     slug:{type:String,required: true},
    permission: [
      {
        checked:{type:String},
        access:{type:Array},
        module:{type:String,}
      }
    ],
  },
  { collection: "roles", timestamps: true }
);

const Role = mongoose.model("Role", RoleSchema);
module.exports = {Role,RoleSchema};


