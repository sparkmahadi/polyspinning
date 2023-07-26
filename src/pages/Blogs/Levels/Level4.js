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
        <div className={`p-5 border border-1 ml-20 rounded-lg`}>
            <div>
                <h2 className='text-lg font-semibold'> Bullet Points Level : {level}</h2>
                {
                    parentObj?.detail?.map((obj, i) =>
                        <div key={obj.item}>
                            <div className='border border-1 max-w-lg p-5 my-2 rounded-lg'>
                                <div className='flex justify-between items-center'>
                                    <h5>Section No: {i + 1}</h5>
                                    <button onClick={() => handleDeleteSection(obj.item, parentIndex)} className="btn btn-xs">Delete</button>
                                </div>
                                <label className='text-lg font-semibold'>Title:</label>
                                <br />
                                <input onBlur={(e) => handleAddValuesToLvl4(e, 'title', i)} className="input input-bordered w-full max-w-md" type="text" name={`title-${i}`} />
                                <br />
                                <label className='text-lg font-semibold'>Details:</label>
                                <br />
                                <input onBlur={(e) => handleAddValuesToLvl4(e, 'detail', i)} className="input input-bordered w-full max-w-md" type="text" name={`detail-${i}`} />
                            </div>

                            {/* <button onClick={() => handleAddLevel4(level + 1, obj, i, parentIndex)} className="btn btn-primary btn-xs mr-3">Add Level {level + 1} Here</button> */}

                            {
                                // Array.isArray(obj?.detail) && <Level4 parentIndex={i} parentObj={obj} grandParentIndex={parentIndex} />
                            }
                        </div>
                    )
                }
                {
                    Array.isArray(parentObj?.detail) &&
                    <button onClick={() => handleAddSection(parentObj, parentIndex, grandParentIndex)} className="btn btn-success btn-sm my-2">Add More Section</button>
                }
                <br />
            </div>
        </div>
    );
};

export default Level4;