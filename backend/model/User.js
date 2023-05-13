import { Sequelize, DataTypes } from "sequelize";
import db from "../database/Connection.js";


// create table users
const User = db.define("users", {
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  refresh_token: {
    type: DataTypes.TIME
  }
}, {
  freezeTableName: true
});


export default User;

// (async () => {
//   await db.sync();
// })();