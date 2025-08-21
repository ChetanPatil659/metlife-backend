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
      default: null,
      minlength: [8, "Mobile Number must be at least 8 digits long"],
      maxlength: [8, "Mobile Number must be at most 8 digits long"],
    },
    employeeCode: {
      type: Number,
      default: null,
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

userSchema.post("findOneAndUpdate", async function (doc) {
  try {
    console.log("========= /updateOne ========= triggered ==========", doc);
    const SHEET_URL = "https://script.google.com/macros/s/AKfycbxM_OfnwX9wo3DqlIV_G5C0pD_InJSvSa7UcxqERazPjoldIooZDO9SfMJTUvxCssq7/exec";
    const values = [[
      doc._id?.toString() || "",
      doc.name || "",
      doc.mobile || "",
      doc.consent || "",
      doc.channel || "",
      doc.employeeCode || "",
      doc.buisnessCode || "",
      doc.city || "",
      doc.age || "",
      doc.monthlyExpense || "",
      doc.retirementAge || "",
      doc.futureValue || "",
      doc.retirementCorpus || "",
      doc.yearlyInvestment || "",
      doc.createdAt || "",
      doc.updatedAt || "",
      doc.utm || "",
      doc.utm_source || "",
      doc.utm_campaign || ""
    ]];

    let body = JSON.stringify({
      mode: "append",
      data: values,
      sheetId: "1ztK5yqeGP83c4db7kbWsi7jQvyQhug7fJb-UtrpBdWM"
    });

    console.log(body, "========= /updateOne ========= body ==========");

    const response = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    console.log("========= /updateOne ========= response ==========", response);

    console.log("✅ New user pushed to Google Sheets");
  } catch (error) {
    console.error("❌ Failed to push to Google Sheets:", error.message);
  }
});

const User = mongoose.model("User", userSchema);

export default User;

//
