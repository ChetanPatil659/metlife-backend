import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    mobile: {
      type: Number,
      required: [true, "Mobile Number is required"],
      minlength: [10, "Mobile Number must be at least 10 digits long"],
      maxlength: [10, "Mobile Number must be at most 10 digits long"],
    },
    consent: {
      type: Boolean,
      default: false,
      required: [true, "Consent is required"],
    },
    buisnessCode: {
      type: Number,
      minlength: [8, "Mobile Number must be at least 8 digits long"],
      maxlength: [8, "Mobile Number must be at most 8 digits long"],
    },
    employeeCode: {
      type: Number,
      minlength: [7, "Mobile Number must be at least 7 digits long"],
      maxlength: [7, "Mobile Number must be at most 7 digits long"],
    },
    channel: {
      type: String,
      enum: ["agency", "pnb", "jkb", "kbl", "psf", "social_media"],
      default: "social_media",
    },
    city: {
      type: String,
    },
    age: {
      type: Number,
    },
    retirementAge: {
      type: Number,
    },
    monthlyExpense: {
      type: Number,
    },
    yearlyInvestment: {
      type: Number,
    },
    retirementCorpus: {
      type: Number,
    },
    futureValue: {
      type: Number,
    },
    utm: {
      type: String,
      default: null,
    },
    utm_source: {
      type: String,
      default: null,
    },
    utm_campaign: {
      type: String,
      default: "Fire Campaign",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

//