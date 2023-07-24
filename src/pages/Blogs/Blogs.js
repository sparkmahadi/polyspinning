import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, setBlogDetails } from '../../redux/features/blogs/blogsSlice';

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs } = useSelector(state => state.blogs);
    // const blogs = [
    //     {
    //         title: "Give a detailed artcile on Draw Textured Yarn Process",
    //         detail: [
    //             {
    //                 title: 'The Draw Textured Yarn (DTY) Process: Creating Versatile Textiles',
    //                 detail: [
    //                     {
    //                         title: 'Introduction',
    //                         detail: 'Draw Textured Yarn (DTY) is a widely used type of yarn in the textile industry, known for its versatility and unique properties. In this article, we will explore the DTY process, which involves transforming a filament yarn into a textured yarn through the application of heat and mechanical stretching. We will delve into the various stages of the DTY process, its significance in textile production, and the characteristics that make DTY an excellent choice for a wide range of applications.',
    //                     },
    //                     {
    //                         title: 'Understanding Draw Textured Yarn (DTY)',
    //                         detail: [
    //                             {
    //                                 title: "Definition and Composition",
    //                                 detail: "DTY refers to a type of yarn that undergoes a texturing process to introduce crimp, bulk, and elasticity into the filament yarn. It is commonly composed of synthetic fibers such as polyester, nylon, or polypropylene, which are well-suited for the texturing process."
    //                             },
    //                             {
    //                                 title: "The Draw Textured Yarn (DTY) Process:",
    //                                 detail: [
    //                                     {
    //                                         title: "Stage 1: Extrusion",
    //                                         detail: "The DTY process begins with the extrusion of continuous filament yarns. Synthetic polymer chips are melted and forced through spinnerets to form continuous filaments, which are then cooled and wound onto bobbins to create the base yarn."
    //                                     },
    //                                     {
    //                                         title: "Stage 2: Texturing",
    //                                         detail: "The texturing process is the heart of DTY production. The base yarn is passed through a series of heated zones, where it is subjected to mechanical stretching and heat setting. This combination of heat and tension imparts crimp and texture to the yarn, giving it a three-dimensional structure."
    //                                     },
    //                                     {
    //                                         title: "Stage 3: Cooling and Winding",
    //                                         detail: "After texturing, the yarn is rapidly cooled to stabilize its structure and lock in the crimp. It is then wound onto bobbins or cones, ready for subsequent processes such as dyeing, weaving, or knitting."
    //                                     },
    //                                 ]
    //                             },
    //                             {
    //                                 title: "Significance and Applications of DTY",
    //                                 detail: [
    //                                     {
    //                                         title: "Versatility",
    //                                         detail: "DTY offers a wide range of properties and characteristics, making it suitable for various applications. Its inherent elasticity, softness, and bulk make it ideal for products such as activewear, sportswear, lingerie, hosiery, and home textiles."
    //                                     },
    //                                     {
    //                                         title: "Enhanced Aesthetics",
    //                                         detail: "The texturing process gives DTY a visually appealing appearance, with a unique play of light and shadow. This makes it a popular choice for fabrics and garments that require a touch of elegance and visual interest."
    //                                     },
    //                                     {
    //                                         title: "Comfort and Performance",
    //                                         detail: "DTY's crimp and elasticity provide excellent stretch and recovery properties, contributing to enhanced comfort and ease of movement. Additionally, DTY fabrics often exhibit good moisture-wicking, breathability, and quick-drying characteristics."
    //                                     },
    //                                 ]
    //                             },
    //                             {
    //                                 title: "Advantages of DTY",
    //                                 detail: [
    //                                     {
    //                                         title: "Improved Bulk and Texture",
    //                                         detail: "DTY's textured structure adds bulk and loft to fabrics, creating a fuller and softer feel. This can enhance the insulation properties of the fabric, making it suitable for cold weather garments and bedding."
    //                                     },
    //                                     {
    //                                         title: "Resistance to Wrinkles and Pilling",
    //                                         detail: "The crimp in DTY helps to reduce wrinkles and minimize the appearance of pilling, ensuring that the fabric maintains its aesthetic appeal even after multiple uses and washes."
    //                                     },
    //                                     {
    //                                         title: "Easy Care and Durability",
    //                                         detail: "DTY fabrics are often easy to care for, requiring minimal ironing and retaining their shape well. They are also known for their durability and resistance to abrasion, allowing them to withstand frequent use and maintain their quality over time."
    //                                     },
    //                                 ]
    //                             },
    //                         ],
    //                     },
    //                     {
    //                         title: 'Conclusion',
    //                         detail: "The Draw Textured Yarn (DTY) process is a crucial step in textile production, transforming continuous filament yarns into versatile, textured yarns with enhanced properties. DTY's unique characteristics, such as bulk, softness, elasticity, and aesthetic appeal, make it a popular choice across various industries. From apparel to home textiles, DTY provides comfort, performance, and durability, catering to the diverse needs of consumers worldwide. As technology and innovation continue to advance, the DTY process is expected to evolve, opening up new possibilities for the creation of innovative and sustainable textile products.",
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         title: "Give a dasdfdsafsdfadf",
    //         detail: [
    //             {
    //                 title: 'The Draw Textured Yarn (Dasdfasdfa sdfatgewrhxtiles',
    //                 detail: [
    //                     {
    //                         title: 'Introduction',
    //                         detail: 'Draw Textured Yarn (DTY) is a widely used type of yarn in the textile industry, known for its versatility and unique properties. In this article, we will explore the DTY process, which involves transforming a filament yarn into a textured yarn through the application of heat and mechanical stretching. We will delve into the various stages of the DTY process, its significance in textile production, and the characteristics that make DTY an excellent choice for a wide range of applications.',
    //                     },
    //                     {
    //                         title: 'Understanding Draw Textured Yarn (DTY)',
    //                         detail: [
    //                             {
    //                                 title: "Definition and Composition",
    //                                 detail: "DTY refers to a type of yarn that undergoes a texturing process to introduce crimp, bulk, and elasticity into the filament yarn. It is commonly composed of synthetic fibers such as polyester, nylon, or polypropylene, which are well-suited for the texturing process."
    //                             },
    //                             {
    //                                 title: "The Draw Textured Yarn (DTY) Process:",
    //                                 detail: [
    //                                     {
    //                                         title: "Stage 1: Extrusion",
    //                                         detail: "The DTY process begins with the extrusion of continuous filament yarns. Synthetic polymer chips are melted and forced through spinnerets to form continuous filaments, which are then cooled and wound onto bobbins to create the base yarn."
    //                                     },
    //                                     {
    //                                         title: "Stage 2: Texturing",
    //                                         detail: "The texturing process is the heart of DTY production. The base yarn is passed through a series of heated zones, where it is subjected to mechanical stretching and heat setting. This combination of heat and tension imparts crimp and texture to the yarn, giving it a three-dimensional structure."
    //                                     },
    //                                     {
    //                                         title: "Stage 3: Cooling and Winding",
    //                                         detail: "After texturing, the yarn is rapidly cooled to stabilize its structure and lock in the crimp. It is then wound onto bobbins or cones, ready for subsequent processes such as dyeing, weaving, or knitting."
    //                                     },
    //                                 ]
    //                             },
    //                             {
    //                                 title: "Significance and Applications of DTY",
    //                                 detail: [
    //                                     {
    //                                         title: "Versatility",
    //                                         detail: "DTY offers a wide range of properties and characteristics, making it suitable for various applications. Its inherent elasticity, softness, and bulk make it ideal for products such as activewear, sportswear, lingerie, hosiery, and home textiles."
    //                                     },
    //                                     {
    //                                         title: "Enhanced Aesthetics",
    //                                         detail: "The texturing process gives DTY a visually appealing appearance, with a unique play of light and shadow. This makes it a popular choice for fabrics and garments that require a touch of elegance and visual interest."
    //                                     },
    //                                     {
    //                                         title: "Comfort and Performance",
    //                                         detail: "DTY's crimp and elasticity provide excellent stretch and recovery properties, contributing to enhanced comfort and ease of movement. Additionally, DTY fabrics often exhibit good moisture-wicking, breathability, and quick-drying characteristics."
    //                                     },
    //                                 ]
    //                             },
    //                             {
    //                                 title: "Advantages of DTY",
    //                                 detail: [
    //                                     {
    //                                         title: "Improved Bulk and Texture",
    //                                         detail: "DTY's textured structure adds bulk and loft to fabrics, creating a fuller and softer feel. This can enhance the insulation properties of the fabric, making it suitable for cold weather garments and bedding."
    //                                     },
    //                                     {
    //                                         title: "Resistance to Wrinkles and Pilling",
    //                                         detail: "The crimp in DTY helps to reduce wrinkles and minimize the appearance of pilling, ensuring that the fabric maintains its aesthetic appeal even after multiple uses and washes."
    //                                     },
    //                                     {
    //                                         title: "Easy Care and Durability",
    //                                         detail: "DTY fabrics are often easy to care for, requiring minimal ironing and retaining their shape well. They are also known for their durability and resistance to abrasion, allowing them to withstand frequent use and maintain their quality over time."
    //                                     },
    //                                 ]
    //                             },
    //                         ],
    //                     },
    //                     {
    //                         title: 'Conclusion',
    //                         detail: "The Draw Textured Yarn (DTY) process is a crucial step in textile production, transforming continuous filament yarns into versatile, textured yarns with enhanced properties. DTY's unique characteristics, such as bulk, softness, elasticity, and aesthetic appeal, make it a popular choice across various industries. From apparel to home textiles, DTY provides comfort, performance, and durability, catering to the diverse needs of consumers worldwide. As technology and innovation continue to advance, the DTY process is expected to evolve, opening up new possibilities for the creation of innovative and sustainable textile products.",
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    // ];

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch])

    console.log(blogs);

    

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    blogs.map((blog, index) =>
                        <>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{blog.title}</h2>
                                    <ul>
                                        {
                                            blog.detail?.map((det, i) =>
                                                <li key={i} className='list-decimal list-outside'>
                                                    <p>{det.title}</p>
                                                    <ul>
                                                        {
                                                            det.detail?.map((d, i) =>
                                                                <li className='list-disc list-inside'>{d.title}</li>
                                                            )
                                                        }
                                                    </ul>
                                                </li>
                                            )
                                        }
                                    </ul>
                                    <div className="card-actions justify-end">
                                        <Link to={`/blogs/article/${blog._id}`} onClick={() => dispatch(setBlogDetails([blog]))}><button className="btn btn-primary btn-sm">See Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>

            <Link to={'/blogs/create-new-article'}><button className="btn btn-sm btn-primary">Create New Article</button></Link>
        </div>
    );
};

export default Blogs;