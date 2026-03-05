import { TextInput } from '../components/TextInput';
import { SubmitInput } from '../components/SubmitInput';
import { signInProcess, signOutProcess } from '../state/auth';
import { useState } from "react";
import { useAuth } from '../state/auth-context';
import { Link } from '@tanstack/react-router';
export const Account = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const updateEmail = (val: string) => {
        setEmail(val);
    }

    //  regexp taken from https://regexr.com/3e48o
    const emailValidationRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailValid = emailValidationRegexp.test(email);

    const updatePassword = (val: string) => {
        setPassword(val);
    }

    const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await signInProcess(email, password);
    }

    const signOut = async () => {
        return await signOutProcess();
    }

    const { user } = useAuth();

    return (
        <div className="flex-center accountContainer">
            {user ? (
                <div className='formGlobal'>

                    <div className='resetPasswordLinkContainer'>
                        <Link to='/password-reset' className="passwordResetLink" title="Password Reset">Reset Password</Link>
                    </div>

                    <button
                        onClick={() => signOut()}
                        className='btn btnOutline btnOutlinehover'
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <form onSubmit={(e) => signIn(e)} className='formGlobal'>
                    <TextInput
                        formID='loginEmail'
                        inputType='text'
                        labelText='Enter email'
                        inputClass='textInput'
                        placeholderText='name@email.com'
                        inputValue={email}
                        updateFunction={updateEmail}
                        validFormat={emailValid}
                        formatMessage='Please enter a valid email format e.g. name@email.com'
                    />

                    <TextInput
                        formID={'loginPassword'}
                        inputType='password'
                        labelText={'Enter password'}
                        inputClass='textInput'
                        placeholderText={'password'}
                        inputValue={password}
                        updateFunction={updatePassword}
                        validFormat={true}
                        formatMessage=''
                    />

                    <Link to='/password-reset' className="passwordResetLink" title="Password Reset">Forgot Password?</Link>

                    <SubmitInput
                        disabled={!emailValid || password.length < 1}
                    />
                </form>
            )
            }
        </div >
    )
}