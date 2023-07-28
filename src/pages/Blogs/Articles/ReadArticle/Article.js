import React, { useEffect } from 'react';
import DotsBullet from '../../../../components/BulletPoints/DotsBullet';
import ChevronDoubleRegular from '../../../../components/BulletPoints/ChevronDoubleRegular';
import FingerPointer from '../../../../components/BulletPoints/FingerPointer';
import MinusBulletRegular from '../../../../components/BulletPoints/MinusBulletRegular';
import TriangleBullet from '../../../../components/BulletPoints/TriangleBullet';
import ArrowHeadBullet from '../../../../components/BulletPoints/ArrowHeadBullet';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails } from '../../../../redux/features/blogs/blogsSlice';
import { Link, useParams } from 'react-router-dom';

const Article = ({ level = 0 }) => {
  const dispatch = useDispatch();
  const { blogDetails } = useSelector(state => state.blogs);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBlogDetails(id));
  }, [id])

  const renderContent = (data, currentLevel) => {
    return data.map((item, index) => {
      const newLevel = currentLevel + 1;
      return (
        <div key={index} className={`pl-3 md:pl-5 lg:px-16 lg:py-2 bg-base-200 rounded-lg`}>
          <li className='flex items-center gap-3'>
            <div className='w-6 h-6 lg:w-8 lg:h-8 pb-2 lg:pb-9'>
              {newLevel === 1 && <DotsBullet />}
              {newLevel === 2 && <ChevronDoubleRegular />}
              {newLevel === 3 && <ArrowHeadBullet />}
              {newLevel === 4 && <FingerPointer />}
              {newLevel === 5 && <MinusBulletRegular />}
              {newLevel === 6 && <TriangleBullet />}
            </div>
            <h2
              className={`font-bold my-1 lg:mb-2 ${newLevel === 1 ? 'text-xl md:text-2xl lg:text-3xl' : ''
                } ${newLevel === 2 ? 'text-lg md:text-xl lg:text-2xl font-semibold' : ''} ${newLevel === 3 ? 'text-base md:text-lg lg:text-xl font-semibold' : ''
                } ${newLevel === 4 ? 'text-sm md:text-sm lg:text-base font-semibold' : ''} ${newLevel === 5 ? 'text-xs md:text-sm lg:text-base font-semibold' : ''
                }`}
            >
              {item.title} :
            </h2>
          </li>
          {Array.isArray(item.detail) ? (
            <div>{renderContent(item.detail, newLevel)}</div>
          ) : (
            <p
              className={`text-gray-700 ${newLevel === 1 ? 'text-lg md:text-xl lg:text-2xl' : ''
                } ${newLevel === 2 ? 'text-base md:text-lg lg:text-xl' : ''} ${newLevel === 3 ? 'text-sm md:text-base lg:text-lg' : ''
                } ${newLevel === 4 ? 'text-xs md:text-sm lg:text-base' : ''} ${newLevel === 5 ? 'text-xs md:text-sm lg:text-base' : ''}`}
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
      <Link to={`/blogs/article/edit/${id}`}><button className="btn btn-primary btn-sm my-2 md:my-3 lg:my-5">Edit Article</button></Link>
    </div>
  );
};

export default Article;
