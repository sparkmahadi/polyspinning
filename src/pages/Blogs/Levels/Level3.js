import React, { useState } from 'react';
import { addArticleSection, deleteArticleSection, setArticle } from '../../../redux/features/blogs/blogsSlice';
import { useDispatch, useSelector } from 'react-redux';

const level = 3;
let length = 1;
let item = 1;

const Level3 = () => {
    const [isLevel4, setIsLevel4] = useState(false);
    const dispatch = useDispatch();
    const { article } = useSelector(state => state.blogs);
    const { title, detail } = article;
    const [sections, setSections] = useState([0]);
    const handleSubmitData = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = [];
        data.level = level;
        sections.forEach((section, i) => {
            const info = {};
            const title = form[`title-${i}`].value;
            const detail = form[`detail-${i}`].value;
            if (title) {
                info.title = title;
            }
            if (detail) {
                info.detail = detail;
            }
            data.push(info);
        })

        console.log(data);
        // setArticle(data);
    };

    const handleAddSection = () => {
        length++;
        const newObj = { title: "", detail: null, level: 2, item: item + 1 }
        dispatch(addArticleSection(newObj));
        item++;
    }

    const handleDeleteSection = (item) => {
        length--;
        const newObj = { title: "", detail: null, level: 2, item }
        dispatch(deleteArticleSection(newObj));
    }

    const handleAddLevel = (level) => {
        console.log(level);
        if (level === 4) {
            setIsLevel4(true);
            // setIsLevel2(true);
            const newArticle =
            {
                ...article.detail,
                detail: [
                    { title: "", detail: null, level: 3, item: 1 }
                ]
            }
            dispatch(setArticle(newArticle));
        }
    }
    return (
        <div className={`p-5 border border-1 ml-40`}>
            <form onSubmit={handleSubmitData}>
                <h2 className='text-lg font-semibold'> Bullet Points Level : {level}</h2>
                {
                    detail.map((obj, i) =>
                        <div key={obj.item} className='border border-1 max-w-lg p-5 m-2 rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <h5>Section No: {i + 1}</h5>
                                <button onClick={() => handleDeleteSection(obj.item)} className="btn btn-xs">Delete</button>
                            </div>
                            <label className='text-lg font-semibold'>Title:</label>
                            <br />
                            <input className="input input-bordered w-full max-w-md" type="text" name={`title-${i}`} />
                            <br />
                            <label className='text-lg font-semibold'>Details:</label>
                            <br />
                            <input className="input input-bordered w-full max-w-md" type="text" name={`detail-${i}`} />
                        </div>
                    )
                }
                <br />

                <div>
                    <button onClick={() => handleAddSection()} className="btn btn-primary btn-sm mr-3">Add More Section</button>
                    <button onClick={() => handleAddLevel(level + 1)} className="btn btn-primary btn-sm mr-3">Add Level {level + 1} Here</button>
                    {/* <button className='btn btn-primary btn-sm' type='submit'>Submit Data</button> */}
                </div>
            </form>


            {/* {
                isLevel3 &&
                <Level3 />
            } */}
        </div>
    );

};

export default Level3;