import mongoose from "mongoose";

const { Schema } = mongoose;

const adressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const contactSchema = new Schema({
  telefon: { type: String, required: true },
  eMail: { type: String, required: true },
});

const additionalInformationSchema = new Schema({
  parents: { type: String, required: true },
  legalRepresentative: { type: String, required: true },
});

const clientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  adress: { type: adressSchema.clone(), required: true },
  contact: { type: contactSchema.clone(), required: true },
  additionalInformation: {
    type: additionalInformationSchema.clone(),
    required: true,
  },
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
