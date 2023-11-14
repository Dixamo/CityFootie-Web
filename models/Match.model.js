const { Schema, model } = require("mongoose")

const matchSchema = new Schema(
  {
    date: {
      type: Date,
      require: true
    },
    field: {
      type: Schema.Types.ObjectId,
      ref: 'Field'
    },
    assistants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

// matchSchema.index({ date: 1 }, { unique: true })

const Match = model("Match", matchSchema)

module.exports = Match