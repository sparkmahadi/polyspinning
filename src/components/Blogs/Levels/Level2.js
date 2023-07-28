import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addArticleLevel3, addArticleSectionToLvl2, addDetailToLvl2, addTitleToLvl2, deleteArticleLevel2, deleteArticleSectionOfLvl2 } from '../../../redux/features/blogs/blogsSlice';
import Level3 from './Level3';
import { FaTrash } from "react-icons/fa"
import { RxCrossCircled } from 'react-icons/rx';
const level = 2;
let length = 1;
let lvl2Item = 1;
let lvl3Item = 1;

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
        <div className={`p-2 md:p-3 lg:p-5 border border-1 ml-8 md:ml-12 lg:ml-20 mt-2 md:mt-3 rounded-lg`}>
            <div>
                <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-base md:text-lg lg:text-xl font-semibold'> Bullet Points Level : {level}</h3>
                    <button onClick={() => dispatch(deleteArticleLevel2())}>
                        <FaTrash className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 hover:text-red-500' />
                    </button>
                </div>
                {
                    detail?.map((obj, i) =>
                        <div key={obj.item} className={`border border-1 p-2 md:p-3 lg:p-5 rounded-lg ${i > 0 ? "mt-2 md:mt-3 lg:mt-5" : undefined}`}>
                            <div className='flex justify-between items-center'>
                                <h5 className='text-sm lg:text-base font-semibold'>Section No: {i + 1}</h5>
                                <button onClick={() => handleDeleteSection(obj.item)}>
                                    <RxCrossCircled className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 hover:text-red-500 hover:text-red-500' />
                                </button>
                            </div>
                            <label className='text-sm lg:text-base'>Title:</label>
                            <br />
                            <input onBlur={(e) => handleAddValuesToLvl2(e, 'title', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`title-${i}`} defaultValue={obj.title} />
                            <br />
                            {
                                Array.isArray(obj?.detail) ||
                                <>
                                    <label className='text-sm lg:text-base'>Details:</label>
                                    <br />
                                    <input onBlur={(e) => handleAddValuesToLvl2(e, 'detail', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`detail-${i}`} defaultValue={obj.detail} />
                                </>
                            }

                            <div className=''>
                                <button onClick={() => handleAddLevel3(level + 1, obj, i)} className="btn btn-primary btn-xs md:btn-sm mt-2 md:mt-3">Add Level {level + 1} Here</button>
                            </div>

                            {
                                Array.isArray(obj?.detail) && <Level3 parentIndex={i} parentObj={obj} />
                            }
                        </div>
                    )
                }

                <div>
                    <button onClick={() => handleAddSection()} className="btn btn-success btn-xs lg:btn-sm mt-2 md:mt-3 lg:mt-5">Add More Section</button>
                </div>
            </div>

        </div>
    );

};

export default Level2;