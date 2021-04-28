import React from "react";
import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";

import { addCategory } from "../redux/categories/categories.actions";

const resetValues = {
  name: "",
};

const CategoryForm = () => {
  const dispatch = useDispatch();

  const labelStyles = "block text-md text-center text-gray-7000 pt-2 pb-1";
  const inputStyles =
    "w-full shadow-md p-1.5 text-sm border border-solid border-gray-300 rounded-lg";
  const error = "block text-sm text-red-600 pt-1";
  let initialValues = resetValues;
  const requiredMsg = "This field is required";

  // Synchronous validation
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = requiredMsg;
    } else if (values.name.length < 4) {
      errors.name = "At least 4 characters";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(addCategory(values.name));
      }}
      validate={validate}
    >
      {({ errors, touched }) => (
        <Form className="max-w-md mx-auto">
          <label htmlFor="name" className={labelStyles}>
            Category name
          </label>
          <Field
            id="name"
            name="name"
            placeholder="Add the new category name"
            className={inputStyles}
          />
          {errors.name && touched.name ? (
            <div className={error}>{errors.name}</div>
          ) : null}
          <div className="mt-4 flex justify-center content-center">
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-blue-600 text-white"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
