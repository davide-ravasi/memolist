const convertErrorMessages = (err) => {
    if(typeof err === 'string' || err instanceof String) {
        return {
            code: 'Application error',
            message: err
        }
    } else {
        return {...err}
    }
}

export default convertErrorMessages;