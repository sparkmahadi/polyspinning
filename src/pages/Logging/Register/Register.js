import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { AuthContext } from '../../../contexts/UserContext';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    // const [token] = useSetToken(userEmail);
    const { createNewUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const accountType = form.accountType.value;

        createNewUser(email, password)
            .then(r => {
                const user = r.user;
                console.log(user);
                setError('');
                form.reset();
                handleUpdateUserProfile(name);
                // if (user) {
                //     saveUser(name, email, accountType);
                // }
            })
            .catch(e => {
                console.error(e);
                setError(e.message);
                setLoading(false);
            })
    }

    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name
        }
        if (photoURL) {
            profile.photoURL = photoURL
        }
        updateUserProfile(profile)
            .then(() => { })
            .catch(e => console.error(e));
    }

    const saveUser = (name, email, accountType) => {
        const user = { name, email, accountType, verified: false };
        fetch('https://next-rep-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success("Account Registered Successfully");
                    setUserEmail(user?.email);
                }
            })
    }

    // useEffect(() => {
    //     if (token) {
    //         navigate(from, { replace: true });
    //     }
    // }, [token, userEmail])

    return (
        <div>
            {
                // loading && <div className="custom-align"><Spinner></Spinner></div>
            }
            <h2 className='bg-sky-300 p-2 text-white text-center text-xl lg:text-2xl font-semibold uppercase'>Registration</h2>
            <form data-aos="fade-right" data-aos-duration="2000" onSubmit={handleSubmit} className='container mx-auto bg-white px-10 py-10 rounded-lg text-gray-900 md:w-2/3 lg:w-1/2'>

                <div className="mb-6 flex justify-center items-center gap-5">
                    <label htmlFor="accountType" className="block text-lg font-medium">Account Type:</label>
                    <select className=' text-lg' name="accountType" id="accountType">
                        <option value="NormalUser">Normal User</option>
                        <option value="Moderator">Moderator</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-lg font-medium">Your Full Name:</label>
                    <input type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Your Full Name" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-lg font-medium">Your email</label>
                    <input type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Your Email" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-lg font-medium">Your password</label>
                    <input type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l block w-full p-2.5" placeholder='Enter Your Password' required />
                </div>
                <p className='text-red-600 mb-2'>{error}</p>
                <p className='pb-2'>Already have an account? Please <Link className='text-secondary font-semibold' to='/login'>Login</Link> Now!</p>

                <button type="submit" className="btn btn-primary btn-sm normal-case">Register</button>
            </form>
        </div>
    );
};

export default Register;