import mongoose from "mongoose";
const { Schema } = mongoose;

const AddressSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },

    phone: {
      type: String,
      required: true,
      validate: {
        validator: v => /^\d{10,15}$/.test(v),
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    alternatePhone: {
      type: String,
      validate: {
        validator: v => !v || /^\d{10,15}$/.test(v),
        message: props => `${props.value} is not a valid alternate phone!`,
      },
    },
    email: {
      type: String,
      validate: {
        validator: v => !v || /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(v),
        message: props => `${props.value} is not a valid email!`,
      },
    },
    instructions: { type: String }, 

    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Address = mongoose.models.Address || mongoose.model('Address', AddressSchema);
export default Address;
