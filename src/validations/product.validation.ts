import Joi from "joi/lib";

interface ProductInterface {
    name: string;
    price: number | null | "";
}

export const createProductValidation = (payload: ProductInterface) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().allow("", null),
    });

    return schema.validate(payload);
};
