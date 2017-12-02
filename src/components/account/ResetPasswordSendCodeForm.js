import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const ConfirmAccountForm = ({ email, onSave, onChange, saving, errors }) => {
    return (
        <form>
            <h1>Send reset password code </h1>

            <div>{errors.status}</div>

            <TextInput
                name="email"
                label="Email"
                hintText="email@email.com"
                value={email}
                onChange={onChange}
                errorText={errors.email} />

            <input type="submit"
                disabled={saving}
                value={saving ? 'Sending...' : 'Send'}
                className="btn btn-primary"
                onClick={onSave} />
        </form>
    );
};

ConfirmAccountForm.propTypes = {
    saving: React.PropTypes.bool.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,
    email: React.PropTypes.object.isRequired
};

export default ConfirmAccountForm;