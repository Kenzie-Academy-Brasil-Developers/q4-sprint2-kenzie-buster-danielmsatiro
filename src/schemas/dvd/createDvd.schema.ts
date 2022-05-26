import * as yup from "yup";

const createDvdSchema = yup
  .object()
  .shape({
    dvds: yup.array().of(
      yup
        .object()
        .shape({
          name: yup
            .string()
            .required()
            .transform((value, originalValue) => {
              return originalValue.replace(/\w\S*/g, (t: string) => {
                return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
              });
            }),
          duration: yup.string().required(),
          quantity: yup.number().min(0).integer().required(),
          price: yup.number().required().positive(),
        })
        .required()
    ),
  })
  .required();

/* .transform((value, originalValue) => {
  return originalValue.round(2);
}), */

export { createDvdSchema };
