import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/UserContext';

const ResetPassword = () => {
    const [error, setError] = useState('');
    const { resetPassword } = useContext(AuthContext);

    const { register, handleSubmit } = useForm();

    const onSubmit = (d) => {
        setError('');
        const email = d.resetEmail;
        // console.log(email);
        resetPassword(email)
            .then(() => {
                toast.success('Password reset email sent to your email.')
            })
            .catch(e => {
                console.error(e);
                setError(e);
            })
        // toast.info("password reset mail is sent to your email");
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='container mx-auto bg-white px-5 px-10 py-10 rounded-lg text-gray-900 md:w-2/3 lg:w-1/2'>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-lg font-medium">Your email</label>
                    <input {...register("resetEmail")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Your Email" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-lg font-medium">Put the last password you remember</label>
                    <input {...register("resetPassword")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Your Last Password" required="" />
                </div>

                <p className='text-red-600 mb-2'>{error}</p>

                <button type="submit" className="btn btn-primary btn-sm normal-case">Reset Password</button>

            </form>
        </div>
    );
};

export default ResetPassword;