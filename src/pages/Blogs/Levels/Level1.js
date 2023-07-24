import React, { useState } from 'react';
import Level2 from './Level2';
import Level3 from './Level3';
const level = 1;
let length = 1;

const Level1 = ({ article, setArticle }) => {
    const [sections, setSections] = useState([0]);
    const [isLevel2, setIsLevel2] = useState(false);
    const [isLevel3, setIsLevel3] = useState(false);

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
        setArticle(data);
    };

    const handleAddSection = () => {
        setSections([...sections, length]);
        length++;
        console.log(length, sections);
    }
    const handleDeleteSection = () => {
        const newArray = sections.slice(0, sections.length - 1);
        setSections(newArray);
        length--;
        console.log(length, sections);
    }

    const handleAddLevel = (level) => {
        if (level === 2) {
            setIsLevel2(true);
        }
        if (level === 3) {
            setIsLevel3(true);
        }
    }
    return (
        <div className='p-5 border border-1'>
            <form onSubmit={handleSubmitData}>
                <h2 className='text-lg font-semibold'> Bullet Points Level : {level}</h2>
                {
                    sections.map((section, i) =>
                        <div key={i} className='border border-1 max-w-lg p-5 m-2 rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <h5>Section No: {i + 1}</h5>
                                <button onClick={() => handleDeleteSection()} className="btn btn-xs">Delete</button>
                            </div>
                            <label className='text-lg font-semibold'>Title:</label>
                            <br />
                            <input className="input input-bordered w-full max-w-md" type="text" name={`title-${i}`} />
                            <br />
                            {
                                isLevel2 ||
                                <>
                                    <label className='text-lg font-semibold'>Details:</label>
                                    <br />
                                    <input className="input input-bordered w-full max-w-md" type="text" name={`detail-${i}`} />
                                </>
                            }
                        </div>
                    )
                }
                <br />

                <div>
                    <button onClick={() => handleAddSection()} className="btn btn-primary btn-sm mr-3">Add More Section</button>
                    <button onClick={() => handleAddLevel(level + 1)} className="btn btn-primary btn-sm mr-3">Add Level {level + 1} Here</button>
                    <button className='btn btn-primary btn-sm' type='submit'>Submit Data</button>
                </div>
            </form>

            {
                isLevel2 &&
                <Level2 />
            }
            {
                isLevel3 &&
                <Level3 />
            }


        </div>
    );

};

export default Level1;