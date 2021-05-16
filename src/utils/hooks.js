import {useState} from 'react';

export const useForm = (callback,initialState = {}) => {
    const [Values, setValues] = useState(initialState);

    const onChange = (event) => {
        setValues({...Values,[event.target.name]:event.target.value});
    }

    
    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    }

    return{
        onChange,
        onSubmit,
        Values
    }
}