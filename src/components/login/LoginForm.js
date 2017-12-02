import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const LoginForm = ({ user, onSave, onChange, saving, errors }) => {
    return (
        <form>
            <h1>Login </h1>
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

            <input type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />
        </form>
    );
};

LoginForm.propTypes = {
    saving: React.PropTypes.bool.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,
    user: React.PropTypes.object.isRequired
};

export default LoginForm;