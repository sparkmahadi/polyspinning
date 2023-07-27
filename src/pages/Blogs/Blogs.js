import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, removeArticle } from '../../redux/features/blogs/blogsSlice';
import { AuthContext } from './../../contexts/UserContext';
import Spinner from '../../components/Spinner/Spinner';
import useCheckAccType from '../../hooks/useCheckAccType';

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs, loading } = useSelector(state => state.blogs);
    const { user, loading: userLoading } = useContext(AuthContext);
    const [accType, isAccLoading] = useCheckAccType(user?.email);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch])

    console.log(blogs);

    const handleDeleteArticle = (id, title) => {
        const confirm = window.confirm(`Are you sure to delete this blog titled "${title}"??`);
        if (confirm) {
            dispatch(removeArticle(id));
        }
    }

    if (userLoading || loading || isAccLoading) {
        return <Spinner />
    }

    return (
        <div className='mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8'>
            <h3 className='text-center className="text-xl md:text-2xl lg:text-3xl font-bold pt-5'>Important Blogs</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    blogs.map((blog, index) =>
                        <div key={index} className="card lg:w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{blog.title}</h2>
                                <ul>
                                    {
                                        Array.isArray(blog?.detail) &&
                                        blog.detail?.map((det, i) =>
                                            <li key={i} className='list-decimal list-outside'>
                                                <p>{det.title}</p>
                                                <ul>
                                                    {
                                                        Array.isArray(det?.detail) &&
                                                        det?.detail?.map((d, i) =>
                                                            <li key={i} className='list-disc list-inside'>{d.title}</li>
                                                        )
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    }
                                </ul>
                                <div className='flex gap-5 '>
                                    <div className="card-actions justify-end">
                                        <Link to={`/blogs/article/${blog._id}`}><button className="btn btn-primary btn-sm">See Details</button></Link>
                                    </div>

                                    {
                                        user && accType === "Admin" &&
                                        <div className="card-actions justify-end">
                                            <button onClick={() => handleDeleteArticle(blog._id, blog.title)} className="btn btn-sm">Delete</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className='text-center pt-5 md:pt-10'>
                <Link to={'/blogs/create-new-article'}><button className="btn btn-sm btn-primary">Create New Article</button></Link>
            </div>
        </div>
    );
};

export default Blogs;