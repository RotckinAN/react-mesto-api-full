import {useState} from "react";

function useValidation() {
    const [isDirty, setIsDirty] = useState(true);
    const [inputError, setInputError] = useState('');
    const [inputValid, setInputValid] = useState(false);

    function validation(value) {
        if (!value.validity.valid) {
            setInputValid(false)
            setIsDirty(true);
            setInputError(value.validationMessage);
        } else {
            setInputValid(true)
            setIsDirty(false);
            setInputError('');
        }
    }

    return {isDirty, inputError, inputValid, validation, setIsDirty, setInputValid, setInputError}
}

export default useValidation