import Caption from "../models/caption.schema.js";

export const createCaption = async ({
  firstname,
  lastname,
  email,
  password,
  plate,
  capacity,
  color,
  vehicalType,
}) => {
  try {
    if(!firstname || !lastname || !email || !password || !plate || !capacity || !color || !vehicalType) {
      throw new Error("All fields are required");
    }
    const caption = new Caption({
    fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      plate,
      capacity,
      color,
      vehicalType,
    });
    await caption.save();
    return caption;
  } catch (error) {
    throw new Error("Error creating caption: " + error.message);
  }
};
