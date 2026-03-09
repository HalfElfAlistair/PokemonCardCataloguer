import { TextInput } from '../components/TextInput';
import { resetPassword } from '../state/auth';
import { useState } from "react";
import { useAuth } from '../state/auth-context';
export const PasswordReset = () => {

    const [accountEmail, setAccountEmail] = useState("");
    const [passwordResetSuccess, setPasswordResetSuccess] = useState('');

    const updateAccountEmail = (val: string) => {
        setAccountEmail(val);
    }

    //  regexp taken from https://regexr.com/3e48o
    const emailValidationRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailValid = emailValidationRegexp.test(accountEmail);

    const { user } = useAuth();

    const onResetPassword = async () => {
        let emailToUse: string;
        if (user) {
            emailToUse = user?.email ?? '';
        } else {
            emailToUse = accountEmail;
        }
        const res = await resetPassword(emailToUse);
        if (res) {
            setPasswordResetSuccess('Request successful, please check your email inbox to proceed with the password reset.')
        } else {
            setPasswordResetSuccess('Request failed, please try again.')
        }
    }

    return (
        <main className="flex-center accountContainer" role="main">
            <div className='formGlobal'>
                {!user && (
                    <TextInput
                        formID='loginEmail'
                        inputType='text'
                        labelText='Enter email'
                        inputClass='textInput'
                        placeholderText='name@email.com'
                        inputValue={accountEmail}
                        updateFunction={updateAccountEmail}
                        validFormat={emailValid}
                        formatMessage='Please enter a valid email format e.g. name@email.com'
                    />
                )}

                <button
                    onClick={() => onResetPassword()}
                    className={`btn btnOutline ${!user && !emailValid ? 'btnDisabled' : 'btnOutlinehover'}`}
                    disabled={!user && !emailValid}
                >
                    Reset Password
                </button>

                {passwordResetSuccess.length > 0 && (
                    <p className='passwordResetSuccess'>{passwordResetSuccess}</p>
                )}
            </div>
        </main>
    )
}