import * as yup from "yup";

const serializedDvdSchema = yup.object().shape({
  dvds: yup.array().of(
    yup
      .object()
      .shape({
        name: yup.string().required(),
        duration: yup.string().required(),
        stock: yup.object().shape({
          quantity: yup.number().min(0).integer().required(),
          price: yup.number().required().positive(),
          id: yup.string().uuid().required(),
        }),
        id: yup.string().uuid().required(),
      })
      .nullable()
  ),
});

export { serializedDvdSchema };
