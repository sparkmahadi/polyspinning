import React from 'react';
import { useDispatch } from 'react-redux';
import { addArticleSectionToLvl4, addDetailToLvl4, addTitleToLvl4, deleteArticleLevel4, deleteArticleSectionOfLvl4 } from '../../../redux/features/blogs/blogsSlice';
import { FaTrash } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
const level = 4;
let length = 1;
let lvl4Item = 1;
const Level4 = ({ parentIndex, parentObj, grandParentIndex }) => {
    const dispatch = useDispatch();

    const handleAddSection = (parentObj, parentIndex) => {
        length++;
        const newObj = { title: "", detail: null, level, level3Index: parentIndex, level2Index: grandParentIndex }
        dispatch(addArticleSectionToLvl4(newObj));
        lvl4Item++;
    }
    const handleDeleteSection = (item, parentIndex) => {
        length--;
        const newObj = { title: "", detail: null, level, item, level3Index: parentIndex, level2Index: grandParentIndex }
        dispatch(deleteArticleSectionOfLvl4(newObj));
    }

    const handleAddLevel5 = (level, parentObj, indexOfParentObj, indexOfGrandParentObj) => {
        if (level === 5) {
            const childObj = { title: "", detail: null, level, lvl3Index: indexOfParentObj, level2Index: indexOfGrandParentObj }
            // dispatch(addArticleLevel4({ parentObj, childObj, indexOfParentObj, indexOfGrandParentObj }));
            lvl4Item++;
        }
    }

    const handleAddValuesToLvl4 = (e, type, childIndex) => {
        if (type === "title") {
            const title = e.target.value;
            dispatch(addTitleToLvl4({ title, grandParentIndex, parentIndex, childIndex }));
        }
        if (type === "detail") {
            const detail = e.target.value;
            dispatch(addDetailToLvl4({ detail, grandParentIndex, parentIndex, childIndex }));
        }
    }
    return (
        <div className={`p-2 md:p-3 lg:p-5 border border-1 ml-8 md:ml-12 lg:ml-20 mt-2 md:mt-3 rounded-lg`}>
            <div>
                <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-base md:text-lg lg:text-xl font-semibold'> Bullet Points Level : {level}</h3>
                    <button onClick={() => dispatch(deleteArticleLevel4({parentIndex, grandParentIndex}))}>
                        <FaTrash className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 hover:text-red-500' />
                    </button>
                </div>
                {
                    parentObj?.detail?.map((obj, i) =>
                        <div key={obj.item} className={`border border-1 p-2 md:p-3 lg:p-5 rounded-lg ${i > 0 ? "mt-2 md:mt-3 lg:mt-5" : undefined}`}>
                            <div className=''>
                                <div className='flex justify-between items-center'>
                                    <h5 className='text-sm lg:text-base font-semibold'>Section No: {i + 1}</h5>
                                    <button onClick={() => handleDeleteSection(obj.item, parentIndex)}>
                                        <RxCrossCircled className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 hover:text-red-500' />
                                    </button>
                                </div>
                                <label className='text-sm lg:text-base'>Title:</label>
                                <br />
                                <input onBlur={(e) => handleAddValuesToLvl4(e, 'title', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`title-${i}`} defaultValue={obj.title} />
                                <br />
                                <label className='text-sm lg:text-base'>Details:</label>
                                <br />
                                <input onBlur={(e) => handleAddValuesToLvl4(e, 'detail', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`detail-${i}`} defaultValue={obj.detail} />
                            </div>

                            {/* <button onClick={() => handleAddLevel4(level + 1, obj, i, parentIndex)} className="btn btn-primary btn-xs md:btn-sm mt-3">Add Level {level + 1} Here</button> */}

                            {
                                // Array.isArray(obj?.detail) && <Level4 parentIndex={i} parentObj={obj} grandParentIndex={parentIndex} />
                            }
                        </div>
                    )
                }
                {
                    Array.isArray(parentObj?.detail) &&
                    <button onClick={() => handleAddSection(parentObj, parentIndex, grandParentIndex)} className="btn btn-success btn-xs lg:btn-sm mt-2 md:mt-3 lg:mt-5">Add More Section</button>
                }
                <br />
            </div>
        </div>
    );
};

export default Level4;