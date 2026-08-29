export const validate = (e, form, setForm, setError) => {
    const { name, value } = e.target;
    let message = null;

    if (value.trim() === "") {
        message = 'Can not empty';
    } else if (name !== 'fullName' && value.includes(" ")) {
        message = 'Can not have spaces';
    } else if (value.length < 5) {
        message = 'Must have at least 5 characters';
    } else if (name === 'confirmPassword' && value !== form.password) {
        message = 'Password and confirm password not match';
    } else {
        message = 'no error';
    }

    setForm(prev => ({
        ...prev,
        [name]: value
    }));

    setError(prev => ({
        ...prev,
        [name]: message
    }));

};