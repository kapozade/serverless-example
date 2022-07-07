const mongoose = require('mongoose');
const validator = require('validator');

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requried: true,
      validator: {
        validator(title) {
          return validator.isAlphanumeric(title);
        }
      }
    },
    description: {
      type: String,
      required: true,
      validator: {
        validator(description) {
          return validator.isAlphanumeric(description);
        }
      }
    },
    reminder: {
      type: Boolean,
      required: false,
      default: false
    },
    status: {
      type: String,
      enum: ['completed', 'new'],
      default: 'new'
    },
    category: {
      type: String,
      enum: ['shopping', 'personal', 'todos'],
      default: 'todos'
    }
  },
  {
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'updatedOn'
    },
    versionKey: false 
  }
);

module.exports = mongoose.model('Note', NoteSchema, 'Notes');
