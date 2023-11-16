const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'El nombre es necesario']
    },
    email: {
      type: String,
      required: [true, 'El correo es necesario'],
      unique: true,
      lowercase: true,
      trim: true
    },
    cover: {
      type: String
    },

    password: {
      type: String,
      required: [true, 'La contraseña es necesaria']
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
