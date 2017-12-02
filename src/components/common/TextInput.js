import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const TextInput = ({name, label, onChange, placeholder, errorText, type, hintText, value, error}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + "has-error";
    }

    return (
        <div className={wrapperClass}>
            <div>
                <TextField
                    hintText={placeholder}
                    floatingLabelText={label}
                    placeholder={placeholder}
                    hintText={hintText}
                    value={value}
                    type={type}
                    name={name}
                    errorText={errorText}
                    onChange={onChange} />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

TextInput.PropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    hintText: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    errorText: PropTypes.string
};

export default TextInput;