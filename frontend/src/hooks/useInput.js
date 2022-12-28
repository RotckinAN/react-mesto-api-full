import {useState} from "react";
import useValidation from "./useValidation";

function useInput() {
    const [value, setValue] = useState('');
    const {isDirty, inputError, inputValid, validation, setIsDirty, setInputValid, setInputError} = useValidation();

    const handleChange = (evt) => {
        setValue(evt.target.value);
        validation(evt.target);
    }

    return {value, handleChange, setValue, isDirty, setIsDirty, inputError, setInputError, inputValid, setInputValid};
}

export default useInput