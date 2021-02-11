import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { signInWithEmailAndPassword } from "../firebase";

import { editElement } from '../redux/list/list.actions';

import LoginForm from './LoginForm';

const Login = () => {
    const {listItems} = useSelector(state => state.list);
    let { id } = useParams();
    const note = listItems.find(el => el.id === id);
    const defaultValues = {...note} 

    const loginWithEmail = (values) => {
        const {email, password} = values;
        signInWithEmailAndPassword(email, password);
    }

    console.log('login component');

    return <div className="max-w-screen-lg mx-auto pt-5"> 
        <LoginForm defaultValues={defaultValues} action={loginWithEmail} />
    </div>
}

export default Login;