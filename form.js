const { required } = require("joi");
const mongoose = require("mongoose");

const form1Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    parentFirstName: {
      type: String,
      required: true,
    },
    parentLastName: {
      type: String,
      required: true,
    },
    currentAddress: {
      type: String,
      required: true,
    },
    streetAddress1: {
      type: String,
    },
    streetAddress2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const form2Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 16,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    companyName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 26,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 25,
      match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{5,25}$/,
    },
    website: {
      type: String,
      required: true,
      match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
    },
    teamSize: {
      type: Number,
      required: true,
      min: 2,
      max: 15,
    },
  },
  {
    timestamps: true,
  }
);

const form3Schema = new mongoose.Schema(
  {
    Account: {
      type: String,
      require: true,
      match: /^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]+$/,
    },
    Title_of_acccount: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      match: /^[A-Z]+$/,
    },
    Address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      match: /^[A-Z0-9 ]+$/,
    },
    Register_Office_Address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      match: /^[A-Z0-9 ]+$/,
    },
    Industry: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      match: /^[A-Z]+$/,
    },
    Contact_person: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/,
    },
    Designation: {
      type: String,
      match: /^[A-Z]+$/,
      required: false,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/,
    },
    NTN: {
      type: String,
      required: true,
      match: /^[A-Z0-9]+$/,
    },
    GST: {
      type: String,
      required: true,
      match: /^[A-Z0-9]+$/,
    },
    Telephone: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/,
    },
    Fax: {
      type: String,
      required: true,
      match: /^\+?\d{1,4}[-\s]?\(?\d{1,5}\)?[-\s]?\d{1,15}$/,
    },
    UAN: {
      type: String,
      required: true,
      length: 12,
      match: /^\d+$/,
    },
    email: {
      type: String,
      minlength: 6,
      maxlength: 26,
      match: /^[A-Z0-9]/,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    website: {
      type: String,
      match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const form5Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 16,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    dob: {
      type: Date,
      required: true,
    },
    Address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    streetAddress1: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    streetAddress2: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: false,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    region: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    zipcode: {
      type: String,
      required: true,
      match: /^[0-9]{5,10}$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    EmegencyContact: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/,
    },
    citizenship: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    Disability: {
      type: String,
      required: true,
    },
    CompanyName: {
      type: String,
      required: true,
    },
    Position: {
      type: String,
      required: true,
    },
    ReportTO: {
      type: String,
      required: true,
    },
    EmploymentType: {
      type: String,
      required: true,
    },
    Mon: {
      type: Boolean,
      required: true,
    },
    Tue: {
      type: Boolean,
      required: true,
    },
    Web: {
      type: Boolean,
      required: true,
    },
    Thu: {
      type: Boolean,
      required: true,
    },
    Fri: {
      type: Boolean,
      required: true,
    },
    Sat: {
      type: Boolean,
      required: true,
    },
    startingDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > this.dob;
        },
        message: (props) => `"startingDate" must be later than the "dob"`,
      },
    },
    contractDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > this.startingDate;
        },
        message: (props) =>
          `"contractDate" must be later than the "startingDate"`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const form4Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  department: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,15}$/,
    maxlength: 10,
  },
  driversLicenseNo: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
    match: /^[A-Z][0-9]*$/,
    validate: {
      validator: function (value) {
        return /^[A-Z][0-9]*$/.test(value);
      },
      message:
        "driversLicenseNo must start with an uppercase letter followed by numbers",
    },
  },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  policy: { type: Boolean, required: true },
  companySignature: {
    type: String,
    minlength: 1,
    maxlength: 100,
    optional: true,
  },
});

const form1 = mongoose.model("Form1", form1Schema);
const form2 = mongoose.model("Form2", form2Schema);
const form3 = mongoose.model("Form3", form3Schema);
const form5 = mongoose.model("Form5", form5Schema);
const form4 = mongoose.model("Form4", form4Schema);

module.exports = { form1, form2, form3, form5, form4 };
