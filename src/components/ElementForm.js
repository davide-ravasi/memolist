import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';

const resetValues = {
    name: '',
    text: '',
    color: '',
    link: '',
    category: 'React',
    status: 1,
    userId: ''
}

const ElementForm = ({ defaultValues, action }) => {
    const dispatch = useDispatch();
    const labelStyles = 'block text-md text-gray-7000 pt-2 pb-1';
    const inputStyles = 'w-full shadow-md p-1.5 text-sm border border-solid border-gray-300 rounded-lg';
    let initialValues = defaultValues ? defaultValues : resetValues;
    console.log(initialValues);

    return <Formik  
        initialValues={initialValues}     
        onSubmit={(values) => {
            dispatch(action(values));
        }}
      >
        <Form className="max-w-sm mx-auto">
            <label htmlFor="name" className={labelStyles}>Title</label>
            <Field id="name" name="name" placeholder="Title" className={inputStyles} />
            <label htmlFor="text" className={labelStyles}>Text</label>
            <Field id="text" name="text" placeholder="Text" className={inputStyles} />
            <label htmlFor="color" className={labelStyles}>Color</label>
            <Field id="color" name="color" placeholder="Color" className={inputStyles} />
            <label htmlFor="link" className={labelStyles}>Link</label>
            <Field id="link" name="link" placeholder="Link" className={inputStyles} />
            <label htmlFor="category" className={labelStyles}>Category</label>
            <Field as="select" name="category" id="category" className={inputStyles}>
                <option value="react">React</option>
                <option value="typescript">Typescript</option>
                <option value="css">Css</option>
           </Field>
           <div className="mt-4 flex justify-center content-center">
            <button type="submit" className="p-1.5 rounded-lg bg-blue-600 text-white">Submit</button>
           </div>
        </Form>
    </Formik>
}

export default ElementForm;