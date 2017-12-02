import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const RegisterForm = ({ user, onSave, onChange, saving, errors }) => {
    return (
        <form>
            <h1>Register account</h1>
            <TextInput
                name="name"
                label="Name"
                hintText="proskier87"
                onChange={onChange}
                value={user.name}
                errorText={errors.name} />

            <TextInput
                name="email"
                label="Email"
                hintText="youremail@domain.com"
                value={user.email}
                onChange={onChange}
                errorText={errors.email} />

            <TextInput
                name="password"
                label="Password"
                type="password"
                value={user.password}
                onChange={onChange}
                errorText={errors.password} />

            <TextInput
                name="confirmPassword"
                label="Confirm password"
                type="password"
                value={user.confirmPassword}
                onChange={onChange}
                errorText={errors.confirmPassword} />

            <input type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />
        </form>
    );
};

RegisterForm.propTypes = {
    saving: React.PropTypes.bool.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
};

export default RegisterForm;