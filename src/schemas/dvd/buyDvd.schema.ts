import * as yup from "yup";

const buyDvdSchema = yup
  .object()
  .shape({
    quantity: yup.number().integer().min(1).required(),
  })
  .required();

export { buyDvdSchema };
