import React from 'react';
import { Formik, Field, Form } from 'formik';

const resetValues = {
    email: '',
    password: '',
}

const LoginForm = ({ defaultValues, action }) => {

    const labelStyles = 'block text-md text-gray-7000 pt-2 pb-1';
    const inputStyles = 'w-full shadow-md p-1.5 text-sm border border-solid border-gray-300 rounded-lg';
    const error = 'block text-sm text-red-600 pt-1';
    let initialValues = defaultValues ? defaultValues : resetValues;
    const requiredMsg = 'This field is required';

    // Synchronous validation
    const validate = (values, props) => {
        const errors = {};
    
        if (!values.email) {
            errors.email = requiredMsg;
        }

        if (!values.password) {
            errors.password = requiredMsg;
        }

        return errors;
    };

    return <Formik  
        initialValues={initialValues}     
        onSubmit={(values) => {
            action(values);
        }}
        validate={validate}
      >
        {({ errors, touched }) => (
            <Form className="max-w-sm mx-auto">
                <label htmlFor="email" className={labelStyles}>Email*</label>
                <Field id="email" name="email" placeholder="email" className={inputStyles} />
                {errors.email && touched.email ? (
                    <div className={error}>{errors.email}</div>
                ) : null}
                <label htmlFor="password" className={labelStyles}>Password*</label>
                <Field id="password" name="password" type="password" placeholder="password" className={inputStyles} />
                {errors.text && touched.text ? (
                    <div className={error}>{errors.password}</div>
                ) : null}
                <div className="mt-4 flex justify-center content-center">
                    <button type="submit" className="p-1.5 rounded-lg bg-blue-600 text-white">Submit</button>
                </div>
            </Form>
        )}
    </Formik>
}

export default LoginForm;