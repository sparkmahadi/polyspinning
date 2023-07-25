import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addArticleLevel3, addArticleSectionToLvl2, deleteArticleSectionOfLvl2 } from '../../../redux/features/blogs/blogsSlice';
import Level3 from './Level3';
const level = 2;
let length = 1;
let lvl2Item = 1;
let lvl3Item = 1;
const margin = '20px'

const Level2 = () => {
    const dispatch = useDispatch();
    const { article } = useSelector(state => state.blogs);
    console.log("article", article);
    const { title, detail } = article;


    const handleAddSection = () => {
        length++;
        const newObj = { title: "", detail: null, level: 2, item: lvl2Item + 1 }
        dispatch(addArticleSectionToLvl2(newObj));
        lvl2Item++;
    }

    const handleDeleteSection = (item) => {
        length--;
        const newObj = { title: "", detail: null, level: 2, item }
        dispatch(deleteArticleSectionOfLvl2(newObj));
    }

    const handleAddLevel3 = (level, parentObj, indexOfParentObj) => {
        if (level === 3) {
            console.log(level, parentObj);
            const childObj = { title: "", detail: null, level: 3, lvl2Index: indexOfParentObj }
            dispatch(addArticleLevel3({ parentObj, childObj, indexOfParentObj }));
            lvl3Item++;
        }
    }

    return (
        <div className={`p-5 border border-1 ml-40`}>
            <div>
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

                            <button onClick={() => handleAddLevel3(level + 1, obj, i)} className="btn btn-primary btn-sm mr-3">Add Level {level + 1} Here</button>

                            {
                                obj?.detail?.length && <Level3 parentIndex={i} detailObj={obj}/>
                            }
                        </div>
                    )
                }
                <br />

                <div>
                    <button onClick={() => handleAddSection()} className="btn btn-primary btn-sm mr-3">Add More Section</button>
                    {/* <button className='btn btn-primary btn-sm' type='submit'>Submit Data</button> */}
                </div>
            </div>

        </div>
    );

};

export default Level2;