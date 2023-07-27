import React from 'react';
import { useDispatch } from 'react-redux';
import { addArticleSectionToLvl4, addDetailToLvl4, addTitleToLvl4, deleteArticleSectionOfLvl4 } from '../../../redux/features/blogs/blogsSlice';
const level = 4;
let length = 1;
let lvl4Item = 1;
const Level4 = ({ parentIndex, parentObj, grandParentIndex }) => {
    const dispatch = useDispatch();

    const handleAddSection = (parentObj, parentIndex) => {
        length++;
        const newObj = { title: "", detail: null, level, level3Index: parentIndex , level2Index: grandParentIndex }
        dispatch(addArticleSectionToLvl4(newObj));
        lvl4Item++;
    }
    const handleDeleteSection = (item, parentIndex) => {
        length--;
        const newObj = { title: "", detail: null, level, item, level3Index: parentIndex , level2Index: grandParentIndex }
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
            <h3 className='text-sm md:text-base lg:text-lg font-semibold mb-2'> Bullet Points Level : {level}</h3>
                {
                    parentObj?.detail?.map((obj, i) =>
                        <div key={obj.item}>
                            <div className='border border-1 p-2 md:p-3 lg:p-5 rounded-lg'>
                                <div className='flex justify-between items-center'>
                                    <h5 className='text-sm lg:text-base font-semibold'>Section No: {i + 1}</h5>
                                    <button onClick={() => handleDeleteSection(obj.item, parentIndex)} className="btn btn-xs md:btn-sm">Delete</button>
                                </div>
                                <label className='text-sm lg:text-base'>Title:</label>
                                <br />
                                <input onBlur={(e) => handleAddValuesToLvl4(e, 'title', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`title-${i}`} />
                                <br />
                                <label className='text-sm lg:text-base'>Details:</label>
                                <br />
                                <input onBlur={(e) => handleAddValuesToLvl4(e, 'detail', i)} className="input input-bordered input-xs md:input-sm lg:input-md w-full md:my-2" type="text" name={`detail-${i}`} />
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
                    <button onClick={() => handleAddSection(parentObj, parentIndex, grandParentIndex)} className="btn btn-success btn-xs lg:btn-sm my-2 lg:my-3">Add More Section</button>
                }
                <br />
            </div>
        </div>
    );
};

export default Level4;