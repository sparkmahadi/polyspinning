import React, { useState } from 'react';
import Level2 from './Level2';
import { useDispatch, useSelector } from 'react-redux';
import { addDetailToLvl1, addTitleToLvl1, setArticle } from '../../../redux/features/blogs/blogsSlice';
const level = 1;
let length = 1;

const Level1 = () => {
    
    const dispatch = useDispatch();
    const { article } = useSelector(state => state.blogs);
    const { title, detail, item } = article;

    const handleSubmitData = (e) => {
        // e.preventDefault();
    };
    const [isLevel2, setIsLevel2] = useState(false);

    // const handleSubmitData = (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const data = [];
    //     // data.level = level;
    //     sections.forEach((section, i) => {
    //         const info = {};
    //         const title = form[`title-${i}`].value;
    //         const detail = form[`detail-${i}`].value;
    //         if (title) {
    //             info.title = title;
    //         }
    //         if (detail) {
    //             info.detail = detail;
    //         }
    //         data.push(info);
    //     })

    //     // console.log(data);
    //     dispatch(setArticle(data));
    // };

    const handleAddSection = () => {
        // setSections([...sections, length]);
        // length++;
        // console.log(length, sections);
    }
    const handleDeleteSection = () => {
        // const newArray = sections.slice(0, sections.length - 1);
        // setSections(newArray);
        // length--;
        // console.log(length, sections);
    }

    const handleAddLevel = (level, item) => {
        console.log(level);
        if (level === 2) {
            setIsLevel2(true);
            const newArticle =
            {
                ...article,
                detail: [
                    { title: "", detail: null, level: 2, item: 1 }
                ]
            }
            dispatch(setArticle(newArticle));
        }
    }

    return (
        <div>
                <div className='p-5 border border-1'>
                    <form onSubmit={handleSubmitData}>
                        <h2 className='text-lg font-semibold'> Bullet Points Level : {level}</h2>
                        <div className='border border-1 max-w-lg p-5 m-2 rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <h5>Section No: {1}</h5>
                            </div>
                            <label className='text-lg font-semibold'>Title:</label>
                            <br />
                            <input className="input input-bordered w-full max-w-md" type="text" name={`title-main`} />
                            <br />
                            {
                                !article.detail?.length &&
                                    <>
                                        <label className='text-lg font-semibold'>Details:</label>
                                        <br />
                                        <input className="input input-bordered w-full max-w-md" type="text" name={`detail-main`} />
                                    </>
                                    
                            }
                        </div>
                        <br />
                        <button className='btn btn-primary btn-sm' type='submit'>Submit Data</button>

                    </form>

                    <div>
                        <button onClick={() => handleAddLevel(level + 1, item)} className="btn btn-primary btn-sm mr-3">Add Level {level + 1} Here</button>
                    </div>
                    {
                        article.detail?.length &&
                        <Level2 />
                    }
                </div>
                {/* <button onClick={handleSubmitData} className="btn btn-primary">Submit Final</button> */}
            </div>
    );

};

export default Level1;