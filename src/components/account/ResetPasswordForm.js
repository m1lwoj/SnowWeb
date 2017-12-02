import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const ResetPasswordForm = ({ model, onSave, onChange, saving, errors }) => {
    return (
        <form>
            <h1>Reset password</h1>

            <div>{errors.status}</div>

            <TextInput
                name="email"
                label="Email"
                type="text"
                value={model.email}
                onChange={onChange}
                errorText={errors.email} />

            <TextInput
                name="code"
                label="Code"
                type="text"
                value={model.code}
                onChange={onChange}
                errorText={errors.code} />

            <TextInput
                name="password"
                label="New password"
                type="password"
                value={model.password}
                onChange={onChange}
                errorText={errors.password} />

            <TextInput
                name="confirmedPassword"
                label="Confirm new password"
                type="password"
                value={model.confirmedPassword}
                onChange={onChange}
                errorText={errors.confirmedPassword} />

            <input type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />
        </form>
    );
};

ResetPasswordForm.propTypes = {
    saving: React.PropTypes.bool.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,
    model: React.PropTypes.object.isRequired
};

export default ResetPasswordForm;