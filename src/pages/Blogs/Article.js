import React from 'react';
import DotsBullet from '../../components/BulletPoints/DotsBullet';
import ChevronDoubleRegular from '../../components/BulletPoints/ChevronDoubleRegular';
import FingerPointer from '../../components/BulletPoints/FingerPointer';
import MinusBulletRegular from '../../components/BulletPoints/MinusBulletRegular';
import TriangleBullet from '../../components/BulletPoints/TriangleBullet';
import ArrowHeadBullet from '../../components/BulletPoints/ArrowHeadBullet';
import { useDispatch, useSelector } from 'react-redux';

const Article = ({ level = 0 }) => {
  const dispatch = useDispatch();
  const {blogDetails} = useSelector(state => state.blogs);
  console.log(blogDetails);

  const renderContent = (data, currentLevel) => {
    return data.map((item, index) => {
      const newLevel = currentLevel + 1;
      return (
        <div key={index} className={`px-16 py-2 bg-base-200 rounded-lg`}>
          <li className='flex items-center gap-3'>
            <div className='w-8 h-8 pb-9'>
              {newLevel === 1 && <DotsBullet />}
              {newLevel === 2 && <ChevronDoubleRegular />}
              {newLevel === 3 && <ArrowHeadBullet />}
              {newLevel === 4 && <FingerPointer />}
              {newLevel === 5 && <MinusBulletRegular />}
              {newLevel === 6 && <TriangleBullet />}
            </div>
            <h2
              className={`font-bold mb-2 ${
                newLevel === 1 ? 'text-3xl' : ''
              } ${newLevel === 2 ? 'text-2xl font-semibold' : ''} ${
                newLevel === 3 ? 'text-xl font-semibold' : ''
              } ${newLevel === 4 ? 'text-lg font-semibold' : ''} ${
                newLevel === 5 ? 'text-base font-semibold' : ''
              }`}
            >
              {item.title} :
            </h2>
          </li>
          {Array.isArray(item.detail) ? (
            <div>{renderContent(item.detail, newLevel)}</div>
          ) : (
            <p
              className={`text-gray-700 ${
                newLevel === 1 ? 'text-2xl' : ''
              } ${newLevel === 2 ? 'text-xl' : ''} ${
                newLevel === 3 ? 'text-lg' : ''
              } ${newLevel === 4 ? 'text-base' : ''}`}
            >
              {item.detail}
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto">
      {renderContent(blogDetails, level)}
    </div>
  );
};

export default Article;
