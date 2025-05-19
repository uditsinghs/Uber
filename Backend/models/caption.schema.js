import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const captionSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minLength: [3, "first name must be at least 3 characters"],
        maxLength: [20, "first name must be at most 20 characters"]

      }

      , lastname: {
        type: String,
        minLength: [3, "last name must be at least 3 characters"],
        maxLength: [20, "last name must be at most 20 characters"]

      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      minLength: [5, "email must be at least 5 characters"],

    },
    password: {
      type: String,
      required: true,
      minLength: [6, "password must be at least 6 characters"],
      maxLength: [20, "password must be at most 20 characters"]
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive'
    },
    color: {
      type: String,
      default: '#000000',// Default color
      required: true

    },
    plate: {
      type: String,
      required: true,
      minLength: [7, "plate must be at least 7 characters"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "capacity must be at least 1"],
    },
    vehicalType: {
      type: String,
      enum: ['motorcycle', 'car', 'auto'],
      required: true
    },
    location: {
      lat: {
        type: Number,
        
      },
      lng: {
        type: Number,
      
      }
    },

  }
)

captionSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24hours",
  });
  return token;
}


captionSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

captionSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}



const Caption = mongoose.model("Caption", captionSchema);
export default Caption;