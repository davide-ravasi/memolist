import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import BodyTextEditor from './Rte_texteditor';

import { fetchCategories } from '../redux/categories/categories.actions';

const resetValues = {
    name: '',
    text: '',
    link: '',
    category: 'react',
    description: '',
    status: 1,
    userId: ''
}

const ElementForm = ({ defaultValues, action, userName }) => {
    const dispatch = useDispatch();
    const selectCats = state => state.categories;
    const {listCategories} = useSelector(selectCats);
    const [rteValues, setRteValues] = useState('');

    const labelStyles = 'block text-md text-gray-7000 pt-2 pb-1';
    const inputStyles = 'w-full shadow-md p-1.5 text-sm border border-solid border-gray-300 rounded-lg';
    const error = 'block text-sm text-red-600 pt-1';
    let initialValues = defaultValues ? defaultValues : resetValues;
    const requiredMsg = 'This field is required';

    const setFormValue = (value) => {
         setRteValues(value);
    }

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Synchronous validation
    const validate = (values, props) => {
        const errors = {};
    
        if (!values.name) {
            errors.name = requiredMsg;
        } else if (values.name.length < 4) {
            errors.name = 'At least 4 characters';
        }

        if (!values.text) {
            errors.text = requiredMsg;
        }

        if (!values.link) {
            errors.link = requiredMsg;
        }

        return errors;
    };

    return <Formik  
        initialValues={initialValues}
        onSubmit={(values) => {
            dispatch(action(values, rteValues.toString('html'), userName));
        }}
        validate={validate}
      >
        {({ errors, touched }) => (
            <Form className="max-w-md mx-auto">
                <label htmlFor="name" className={labelStyles}>Title</label>
                <Field id="name" name="name" placeholder="Title" className={inputStyles} />
                {errors.name && touched.name ? (
                    <div className={error}>{errors.name}</div>
                ) : null}
                <label htmlFor="description" className={labelStyles}>Description</label>
                <BodyTextEditor name="description" setFormValue={setFormValue} initialDescription={initialValues.description} />
                <label htmlFor="text" className={labelStyles}>Text</label>
                <Field as="textarea" id="text" name="text" placeholder="Code snippet" className={inputStyles} />
                {errors.text && touched.text ? (
                    <div className={error}>{errors.text}</div>
                ) : null}
                <label htmlFor="link" className={labelStyles}>Link</label>
                <Field id="link" name="link" placeholder="Link" className={inputStyles} />
                {errors.link && touched.link ? (
                    <div className={error}>{errors.link}</div>
                ) : null}
                <label htmlFor="category" className={labelStyles}>Category</label>
                {(listCategories && listCategories.length) ?
                    <Field as="select" name="category" id="category" className={inputStyles}>
                        {listCategories.map(cat => <option value={cat.name}>{cat.name}</option>)}
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