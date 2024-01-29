import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  itemName: z
    .string()
    .min(2, { message: "Name field should have atleast 2 charachters" })
    .max(30, {
      message: "Name field should not have more than 30 charachters",
    }),
  itemAmount: z
    .number({ invalid_type_error: "Amount field is required." })
    .min(1, { message: "Amount should atleast be $1" }),
  itemCategory: z
    .string()
    .min(2, { message: "Category field should have atleast 2 charachters" })
    .max(30, {
      message: "Category field should not have more than 30 charachters",
    }),
});

type FormData = z.infer<typeof schema>;
const FormItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [formData, setFormData] = useState({
    itemName: "",
    itemAmount: "",
    itemCategory: "",
  });

  const onSubmit = (data: FieldValues) => {
    reset();
    return setFormData({
      itemName: data.itemName,
      itemAmount: data.itemAmount,
      itemCategory: data.itemCategory,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Item
          </label>
          <input
            {...register("itemName")}
            type="text"
            id="itemName"
            className="form-control"
          />
          {errors.itemName && (
            <p className="text-danger">{errors.itemName.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="itemAmount" className="form-label">
            Amount
          </label>
          <input
            {...register("itemAmount", { valueAsNumber: true })}
            type="number"
            id="itemAmount"
            className="form-control"
          />
          {errors.itemAmount && (
            <p className="text-danger">{errors.itemAmount.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="itemCategory" className="form-label">
            Category
          </label>
          <input
            {...register("itemCategory")}
            type="text"
            id="itemCategory"
            className="form-control"
          />
          {errors.itemCategory && (
            <p className="text-danger">{errors.itemCategory.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      \
    </div>
  );
};

export default FormItem;
