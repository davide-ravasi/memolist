import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import BodyTextEditor from './Rte_texteditor';

import { fetchCategories } from '../redux/categories/categories.actions';

const resetValues = {
    question: '',
    description: '',
    link1: '',
    link2: '',
    link3: '',
    category: 'javascript',
    status: 1,
}

const FlashCardForm = ({ defaultValues, action, userName }) => {
    const dispatch = useDispatch();
    const [rteValues, setRteValues] = useState('');
    const categories = (state) => state.categories;
    const {listCategories} = useSelector(categories);

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
    
        if (!values.question) {
            errors.question = requiredMsg;
        } else if (values.question.length < 4) {
            errors.question = 'At least 4 characters';
        }

        // if (!values.text) {
        //     errors.text = requiredMsg;
        // }

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
                <label htmlFor="question" className={labelStyles}>Question</label>
                <Field id="question" name="question" placeholder="Question" className={inputStyles} />
                {errors.question && touched.question ? (
                    <div className={error}>{errors.question}</div>
                ) : null}
                <label htmlFor="description" className={labelStyles}>Description</label>
                <BodyTextEditor name="description" setFormValue={setFormValue} initialDescription={initialValues.description} />
                <label htmlFor="link1" className={labelStyles}>Link 1</label>
                <Field id="link1" name="link1" placeholder="Link 1" className={inputStyles} />
                {/* {errors.link1 && touched.link1 ? (
                    <div className={error}>{errors.link1}</div>
                ) : null} */}
                <label htmlFor="link2" className={labelStyles}>Link 2</label>
                <Field id="link2" name="link2" placeholder="Link 2" className={inputStyles} />
                {/* {errors.link2 && touched.link2 ? (
                    <div className={error}>{errors.link2}</div>
                ) : null} */}
                <label htmlFor="link3" className={labelStyles}>Link 3</label>
                <Field id="link3" name="link3" placeholder="Link 3" className={inputStyles} />
                {/* {errors.link3 && touched.link3 ? (
                    <div className={error}>{errors.link3}</div>
                ) : null} */}
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

export default FlashCardForm;