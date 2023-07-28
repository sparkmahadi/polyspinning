import React, { useState } from 'react';
import { addArticleSectionToLvl3, addDetailToLvl3, addTitleToLvl3, deleteArticleSectionOfLvl3, addArticleLevel4, deleteArticleLevel3 } from '../../../redux/features/blogs/blogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Level4 from './Level4';
import { FaTrash } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

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
                <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-base md:text-lg lg:text-xl font-semibold'> Bullet Points Level : {level}</h3>
                    <button onClick={() => dispatch(deleteArticleLevel3(parentIndex))}>
                        <FaTrash className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 hover:text-red-500' />
                    </button>
                </div>
                {
                    parentObj?.detail?.map((obj, i) =>
                        <div className={`border border-1 p-2 md:p-3 lg:p-5 rounded-lg ${i > 0 ? "mt-2 md:mt-3 lg:mt-5" : undefined}`} key={obj.item}>
                            <div>
                                <div className='flex justify-between items-center lg:mb-2'>
                                    <h5 className='text-sm lg:text-base font-semibold'>Section No: {i + 1}</h5>
                                    <button onClick={() => handleDeleteSection(obj.item, parentIndex)}>
                                        <RxCrossCircled className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 hover:text-red-500' />
                                    </button>
                                </div>
                                <label className='text-sm lg:text-base'>Title:</label>
                                <input onBlur={(e) => handleAddValuesToLvl3(e, 'title', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`title-${i}`} defaultValue={obj.title} />
                                <br />
                                {
                                    Array.isArray(obj?.detail) ||
                                    <>
                                        <label className='text-sm lg:text-base'>Details:</label>
                                        <br />
                                        <input onBlur={(e) => handleAddValuesToLvl3(e, 'detail', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`detail-${i}`} defaultValue={obj.detail} />
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
                    <button onClick={() => handleAddSection(parentObj, parentIndex)} className="btn btn-success btn-xs lg:btn-sm mt-2 md:mt-3 lg:mt-5">Add More Section</button>
                }
                <br />
            </div>
        </div>
    );

};

export default Level3;