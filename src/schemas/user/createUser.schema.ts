import * as yup from "yup";
import bcrypt from "bcrypt";

const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .transform((value, originalValue) => {
      return originalValue.replace(/\w\S*/g, (t: string) => {
        return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
      });
    }),
  email: yup
    .string()
    .email()
    .required()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase();
    }),
  password: yup
    .string()
    .required()
    .transform((value, originalValue) => {
      return bcrypt.hashSync(originalValue, 10);
    }),
  isAdm: yup.boolean().default(false).optional(),
});

const serializedCreateUserSchema = yup.object().shape({
  isAdm: yup.boolean().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  id: yup.string().uuid().required(),
});

export { createUserSchema, serializedCreateUserSchema };
