import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlogDetails, setArticle } from '../../../../redux/features/blogs/blogsSlice';
import Level1 from '../../../../components/Blogs/Levels/Level1';

const EditArticle = () => {

    const dispatch = useDispatch();
    const { blogDetails, article } = useSelector(state => state.blogs);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getBlogDetails(id));
        if (blogDetails[0]?.title) {
            dispatch(setArticle(blogDetails[0]));
        }
    }, [id]);

    return (
        <div className='mx-auto max-w-md px-6 py-2 md:py-3 lg:py-5 sm:max-w-3xl lg:max-w-7xl lg:px-8'>
            <h3 className='text-xl md:text-2xl lg:text-3xl font-semibold text-center py-2'>Edit Article</h3>

            {
                article.detail ?
                    <Level1 mode={"updateArticle"} />
                    :
                    <h3>No article is choosen. Please go back and choose an article to edit and don't refresh the page during editing.</h3>
            }
        </div>
    );
};

export default EditArticle;