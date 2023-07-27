import React from 'react';
import Level2 from './Level2';
import { useDispatch, useSelector } from 'react-redux';
import { addArticleLevel2, addBlog, addDetailToLvl1, addTitleToLvl1 } from '../../../redux/features/blogs/blogsSlice';
import { useNavigate } from 'react-router-dom';
const level = 1;

const Level1 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { article } = useSelector(state => state.blogs);
    const {item } = article;

    const handleAddLevel = (level, item) => {
        console.log(level);
        if (level === 2) {
            const childObj = { title: "", detail: null, level: 2, item: 1 };
            dispatch(addArticleLevel2(childObj));
        }
    }

    const handleSubmitArticle = () =>{
        console.log("article", article);
        dispatch(addBlog(article));
        navigate("/blogs");
    }

    return (
        <div>
            <div className='p-2 md:p-3 lg:p-5 border border-1 rounded-lg'>
                <div>
                    <h3 className='text-sm md:text-base lg:text-lg font-semibold mb-2'> Bullet Points Level : {level}</h3>
                    <div className='border border-1 p-2 md:p-3 lg:p-5 rounded-lg'>
                    <div className='flex justify-between items-center'>
                                <h5 className='text-sm lg:text-base font-semibold'>Section No: {1}</h5>
                                <button className="btn btn-xs btn-disabled md:btn-sm">Delete</button>
                            </div>
                        <label className='text-sm lg:text-base'>Title:</label>
                        <br />
                        <input onBlur={(e) => dispatch(addTitleToLvl1(e.target.value))} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`title-main`} />
                        <br />
                        {
                            Array.isArray(article.detail) ||
                            <>
                                <label className='text-sm lg:text-base'>Details:</label>
                                <br />
                                <input onBlur={(e) => dispatch(addDetailToLvl1(e.target.value))} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`detail-main`} />
                            </>

                        }
                    </div>
                </div>

                <div>
                    <button onClick={() => handleAddLevel(level + 1, item)} className="btn btn-primary btn-xs md:btn-sm mt-2 md:mt-3">Add Level {level + 1} Here</button>
                </div>
                {
                    Array.isArray(article.detail) &&
                    <Level2 />
                }
            </div>
            <button onClick={handleSubmitArticle} className="btn btn-primary btn-sm mt-2 md:mt-3 lg:mt-5">Submit</button>
        </div>
    );

};

export default Level1;