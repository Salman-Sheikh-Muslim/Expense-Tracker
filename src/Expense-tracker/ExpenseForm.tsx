import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "./categories";

export const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Name field should have atleast 3 charachters" })
    .max(50, {
      message: "Name field should not have more than 50 charachters",
    }),
  amount: z
    .number({ invalid_type_error: "Amount field is required." })
    .min(0.01, { message: "Amount should atleast be $0.01" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FieldValues) => void;
}
const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="text"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category")}
          name="category"
          id=""
          className="form-select"
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
