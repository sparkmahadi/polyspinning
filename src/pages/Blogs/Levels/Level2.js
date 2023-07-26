import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addArticleLevel3, addArticleSectionToLvl2, addDetailToLvl2, addTitleToLvl2, deleteArticleSectionOfLvl2 } from '../../../redux/features/blogs/blogsSlice';
import Level3 from './Level3';
const level = 2;
let length = 1;
let lvl2Item = 1;
let lvl3Item = 1;
const margin = '20px'

const Level2 = () => {
    const dispatch = useDispatch();
    const { article } = useSelector(state => state.blogs);
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

    const handleAddValuesToLvl2 = (e, type, objIndex) => {
        if (type === "title") {
            const title = e.target.value;
            dispatch(addTitleToLvl2({ title, objIndex }));
        }
        if (type === "detail") {
            const detail = e.target.value;
            dispatch(addDetailToLvl2({ detail, objIndex }));
        }
    }

    return (
        <div className={`p-5 border border-1 ml-20 rounded-lg`}>
            <div>
                <h2 className='text-lg font-semibold'> Bullet Points Level : {level}</h2>
                {
                    detail?.map((obj, i) =>
                        <div key={obj.item} className='border border-1 max-w-lg p-5 m-2 rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <h5>Section No: {i + 1}</h5>
                                <button onClick={() => handleDeleteSection(obj.item)} className="btn btn-xs">Delete</button>
                            </div>
                            <label className='text-lg font-semibold'>Title:</label>
                            <br />
                            <input onBlur={(e) => handleAddValuesToLvl2(e, 'title', i)} className="input input-bordered w-full max-w-md" type="text" name={`title-${i}`} />
                            <br />
                            {
                                Array.isArray(obj?.detail) ||
                                <>
                                    <label className='text-lg font-semibold'>Details:</label>
                                    <br />
                                    <input onBlur={(e) => handleAddValuesToLvl2(e, 'detail', i)} className="input input-bordered w-full max-w-md" type="text" name={`detail-${i}`} />
                                </>
                            }

                            <div className='mt-3'>
                                <button onClick={() => handleAddLevel3(level + 1, obj, i)} className="btn btn-primary btn-sm mr-3">Add Level {level + 1} Here</button>
                            </div>

                            {
                                Array.isArray(obj?.detail) && <Level3 parentIndex={i} parentObj={obj} />
                            }
                        </div>
                    )
                }
                <br />

                <div>
                    <button onClick={() => handleAddSection()} className="btn btn-success btn-sm mr-3">Add More Section</button>
                </div>
            </div>

        </div>
    );

};

export default Level2;