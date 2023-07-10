import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdVerified } from 'react-icons/md';
import Spinner from '../../../components/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, verifyUser } from '../../../redux/features/users/usersSlice';
import { deleteUser } from '../../../redux/features/users/apiCalls';

const UsersList = () => {
    const dispatch = useDispatch();
    const {users, isLoading, isError} = useSelector(state => state.users);

    const handleVerifyUser = (email, name) => {
        const agree = window.confirm(`Are you sure to verifiy '${name}' with email: '${email}'?`);
        
        if (agree) {
            dispatch(verifyUser(email));
        }
    }

    const handleDeleteUser = user => {
        const agree = window.confirm(`Are you sure to delete ${user?.email}?`);
        if (agree) {
            dispatch(deleteUser(user._id));
        }
    }

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])
    return (
        <div className='min-h-screen'>
            {
                isLoading && <div className="custom-align"><Spinner></Spinner></div>
            }
            <div className="overflow-x-auto">
                <table className="lg:table lg:w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Account Type</th>
                            <th>Verification</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users?.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td><p className='flex items-center gap-2'>{user.name} <span className='text-sky-600'>{user.verified ? <MdVerified /> : undefined}</span></p></td>
                                <td>{user.email}</td>
                                <td>{user.accountType}</td>
                                <td onClick={() => handleVerifyUser(user.email, user.name)}>
                                    <button disabled={user.verified} className='btn-sm btn btn-primary'>{user.verified ? 'Verified' : 'Verify'}</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className='bg-red-600 p-1 rounded-lg text-white'>
                                        Delete
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersList;