const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    cover: {
      type: String
    },

    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['PLAYER', 'ADMIN', 'ORGANIZER'],
      default: 'PLAYER',
    }
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
