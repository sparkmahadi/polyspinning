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
    const { title, detail, item } = article;

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
            <div className='p-5 border border-1'>
                <div>
                    <h2 className='text-lg font-semibold'> Bullet Points Level : {level}</h2>
                    <div className='border border-1 max-w-lg p-5 m-2 rounded-lg'>
                        <div className='flex justify-between items-center'>
                            <h5>Section No: {1}</h5>
                        </div>
                        <label className='text-lg font-semibold'>Title:</label>
                        <br />
                        <input onBlur={(e) => dispatch(addTitleToLvl1(e.target.value))} className="input input-bordered w-full max-w-md" type="text" name={`title-main`} />
                        <br />
                        {
                            Array.isArray(article.detail) ||
                            <>
                                <label className='text-lg font-semibold'>Details:</label>
                                <br />
                                <input onBlur={(e) => dispatch(addDetailToLvl1(e.target.value))} className="input input-bordered w-full max-w-md" type="text" name={`detail-main`} />
                            </>

                        }
                    </div>
                </div>

                <div>
                    <button onClick={() => handleAddLevel(level + 1, item)} className="btn btn-primary btn-sm mr-3">Add Level {level + 1} Here</button>
                </div>
                {
                    Array.isArray(article.detail) &&
                    <Level2 />
                }
            </div>
            <button onClick={handleSubmitArticle} className="btn btn-primary btn-sm">Submit</button>
        </div>
    );

};

export default Level1;