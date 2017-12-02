import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const ConfirmAccountForm = ({ code, onSave, onClick, onChange, saving, errors, sent, expirationTime }) => {
    return (
        <form>
            <h1>Confirm account </h1>

            <div>{errors.status}</div>

            <input type="button"
                className="btn btn-primary"
                value="Send code on email"
                onClick={onClick}
                disabled={sent} />

            <div>{errors.status}</div>
            <div>{expirationTime}</div>

            <TextInput
                name="code"
                label="Code"
                hintText="1234"
                value={code}
                onChange={onChange}
                errorText={errors.code} />

            <input type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />

        </form>
    );
};

ConfirmAccountForm.propTypes = {
    saving: React.PropTypes.bool.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,
    code: React.PropTypes.object.isRequired
};

export default ConfirmAccountForm;