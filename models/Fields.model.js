const { Schema, model } = require("mongoose")

const fieldSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    location: {
        type: {
            type: String
        },
        coordinates: {
            type: [Number],
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    matches: {
        type: [Schema.Types.ObjectId],
        ref: 'Match'
    }
  },
  {
    timestamps: true
  }
)

fieldSchema.index({location: '2dsphere'})

const Field = model("Field", fieldSchema)

module.exports = Field
