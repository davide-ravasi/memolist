import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../actions/index';

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
    const selectCats = state => state.categories;
    const {listCategories} = useSelector(selectCats);

    const labelStyles = 'block text-md text-gray-7000 pt-2 pb-1';
    const inputStyles = 'w-full shadow-md p-1.5 text-sm border border-solid border-gray-300 rounded-lg';
    const error = 'block text-sm text-red-600 pt-1';
    let initialValues = defaultValues ? defaultValues : resetValues;
    const requiredMsg = 'This field is required';

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    // Synchronous validation
    const validate = (values, props) => {
        const errors = {};
    
        if (!values.name) {
            errors.name = requiredMsg;
        } else if (values.name.length < 4) {
            errors.name = 'At least 4 characters';
        }

        if (!values.color) {
            errors.color = requiredMsg;
        } else if (values.color.length != 6) {
            errors.color = 'The color code must be an exadecimal number. Ex. 000000';
        }

        if (!values.link) {
            errors.link = requiredMsg;
        }

        if (!values.text) {
            errors.text = requiredMsg;
        }

        return errors;
    };

    return <Formik  
        initialValues={initialValues}     
        onSubmit={(values) => {
            dispatch(action(values));
        }}
        validate={validate}
      >
        {({ errors, touched }) => (
            <Form className="max-w-sm mx-auto">
                <label htmlFor="name" className={labelStyles}>Title</label>
                <Field id="name" name="name" placeholder="Title" className={inputStyles} />
                {errors.name && touched.name ? (
                    <div className={error}>{errors.name}</div>
                ) : null}
                <label htmlFor="text" className={labelStyles}>Text</label>
                <Field id="text" name="text" placeholder="Text" className={inputStyles} />
                {errors.text && touched.text ? (
                    <div className={error}>{errors.text}</div>
                ) : null}
                <label htmlFor="color" className={labelStyles}>Color</label>
                <Field id="color" name="color" placeholder="Color" className={inputStyles} />
                {errors.color && touched.color ? (
                    <div className={error}>{errors.color}</div>
                ) : null}
                <label htmlFor="link" className={labelStyles}>Link</label>
                <Field id="link" name="link" placeholder="Link" className={inputStyles} />
                {errors.link && touched.link ? (
                    <div className={error}>{errors.link}</div>
                ) : null}
                <label htmlFor="category" className={labelStyles}>Category</label>
                {listCategories && listCategories.length ?
                    <Field as="select" name="category" id="category" className={inputStyles}>
                        {listCategories.map(cat => <option value={cat}>{cat}</option>)}
                    </Field>
                : 
                    <span>....loading categories</span>
                }        
            <div className="mt-4 flex justify-center content-center">
                <button type="submit" className="p-1.5 rounded-lg bg-blue-600 text-white">Submit</button>
            </div>
            </Form>
        )}
    </Formik>
}

export default ElementForm;