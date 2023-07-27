import React, { useState } from 'react';
import { addArticleSectionToLvl3, addDetailToLvl3, addTitleToLvl3, deleteArticleSectionOfLvl3, addArticleLevel4 } from '../../../redux/features/blogs/blogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Level4 from './Level4';

const level = 3;
let length = 1;
let lvl3Item = 1;

const Level3 = ({ parentIndex, parentObj }) => {
    const dispatch = useDispatch();
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

    const handleAddLevel4 = (level, parentObj, indexOfParentObj, indexOfGrandParentObj) => {
        if (level === 4) {
            const childObj = { title: "", detail: null, level: 4, level3Index: indexOfParentObj, level2Index: indexOfGrandParentObj }
            dispatch(addArticleLevel4({ parentObj, childObj, indexOfParentObj, indexOfGrandParentObj }));
            lvl3Item++;
        }
    }

    const handleAddValuesToLvl3 = (e, type, childIndex) => {
        if (type === "title") {
            const title = e.target.value;
            dispatch(addTitleToLvl3({ title, parentIndex, childIndex }));
        }
        if (type === "detail") {
            const detail = e.target.value;
            dispatch(addDetailToLvl3({ detail, parentIndex, childIndex }));
        }
    }
    return (
        <div className={`p-2 md:p-3 lg:p-5 border border-1 ml-8 md:ml-12 lg:ml-20 mt-2 md:mt-3 rounded-lg`}>
            <div>
            <h3 className='text-sm md:text-base lg:text-lg font-semibold mb-2'> Bullet Points Level : {level}</h3>
                {
                    parentObj?.detail?.map((obj, i) =>
                        <div className='border border-1 p-2 md:p-3 lg:p-5 rounded-lg' key={obj.item}>
                            <div>
                                <div className='flex justify-between items-center lg:mb-2'>
                                    <h5 className='text-sm lg:text-base font-semibold'>Section No: {i + 1}</h5>
                                    <button onClick={() => handleDeleteSection(obj.item, parentIndex)} className="btn btn-xs md:btn-sm">Delete</button>
                                </div>
                                <label className='text-sm lg:text-base'>Title:</label>
                                <input onBlur={(e) => handleAddValuesToLvl3(e, 'title', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`title-${i}`} />
                                <br />
                                {
                                    Array.isArray(obj?.detail) ||
                                    <>
                                        <label className='text-sm lg:text-base'>Details:</label>
                                        <br />
                                        <input onBlur={(e) => handleAddValuesToLvl3(e, 'detail', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`detail-${i}`} />
                                    </>
                                }
                            </div>

                            <button onClick={() => handleAddLevel4(level + 1, obj, i, parentIndex)} className="btn btn-primary btn-xs md:btn-sm mt-2 md:mt-3">Add Level {level + 1} Here</button>

                            {
                                Array.isArray(obj?.detail) && <Level4 parentIndex={i} parentObj={obj} grandParentIndex={parentIndex} />
                            }
                        </div>
                    )
                }
                {
                    Array.isArray(parentObj?.detail) &&
                    <button onClick={() => handleAddSection(parentObj, parentIndex)} className="btn btn-success btn-xs lg:btn-sm my-2 lg:my-3">Add More Section</button>
                }
                <br />
            </div>
        </div>
    );

};

export default Level3;