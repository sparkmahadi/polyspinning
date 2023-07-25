import React, { useState } from 'react';
import { addArticleSectionToLvl3, deleteArticleSectionOfLvl3, setArticle } from '../../../redux/features/blogs/blogsSlice';
import { useDispatch, useSelector } from 'react-redux';

const level = 3;
let length = 1;
let lvl3Item = 1;

const Level3 = ({ parentIndex, detailObj }) => {
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

    const handleAddSection = (parentObj, parentIndex) => {
        length++;
        const newObj = { title: "", detail: null, level: 3, level2Index: parentIndex }
        dispatch(addArticleSectionToLvl3(newObj));
        lvl3Item++;
    }

    const handleDeleteSection = (item, parentIndex) => {
        length--;
        const newObj = { title: "", detail: null, level: 3, item, level2Index: parentIndex }
        dispatch(deleteArticleSectionOfLvl3(newObj));
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
            <div onSubmit={handleSubmitData}>
                <h2 className='text-lg font-semibold'> Bullet Points Level : {level}</h2>
                {
                    detailObj.detail?.map((obj, index) =>
                        <div key={obj.item}>
                            <div className='border border-1 max-w-lg p-5 m-2 rounded-lg'>
                                <div className='flex justify-between items-center'>
                                    <h5>Section No: {index + 1}</h5>
                                    <button onClick={() => handleDeleteSection(obj.item, parentIndex)} className="btn btn-xs">Delete</button>
                                </div>
                                <label className='text-lg font-semibold'>Title:</label>
                                <br />
                                <input className="input input-bordered w-full max-w-md" type="text" name={`title-${index}`} />
                                <br />
                                <label className='text-lg font-semibold'>Details:</label>
                                <br />
                                <input className="input input-bordered w-full max-w-md" type="text" name={`detail-${index}`} />
                            </div>
                            <button onClick={() => handleAddLevel(level + 1, detailObj, index)} className="btn btn-primary btn-sm mr-3">Add Level {level + 1} Here</button>
                        </div>
                    )
                }
                {
                    detailObj?.detail?.length &&
                    <button onClick={() => handleAddSection(detailObj, parentIndex)} className="btn btn-primary btn-sm mr-3">Add More Section</button>
                }
                <br />

                <div>
                    {/* <button className='btn btn-primary btn-sm' type='submit'>Submit Data</button> */}
                </div>
            </div>


            {/* {
                isLevel3 &&
                <Level3 />
            } */}
        </div>
    );

};

export default Level3;