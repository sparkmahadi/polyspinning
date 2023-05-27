import React from 'react';
import HomeCards from '../../components/HomeCards/HomeCards';
import runningGears from "../../images/gear_rotation.gif"

const DtyFloorLayout = () => {
    const machines = [
        {
          id: 1,
          machineNo: 1,
          title: 'Boost your conversion rate',
          poyType: "246/96",
          dtyType: "150/96/NIM",
          imageUrl:
          runningGears,
          author: {
            name: 'Roel Aufderehar',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
          },
          readingLength: '6 min',
        },
        {
          id: 2,
          machineNo: 2,
          title: 'Boost your conversion rate',
          category: { name: 'Article', href: '#' },
          imageUrl:
          runningGears,
          author: {
            name: 'Roel Aufderehar',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
          },
          readingLength: '6 min',
        },
        {
          id: 3,
          machineNo: 3,
          title: 'Boost your conversion rate',
          category: { name: 'Article', href: '#' },
          imageUrl:
          runningGears,
          author: {
            name: 'Roel Aufderehar',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
          },
          readingLength: '6 min',
        },
        {
          id: 4,
          machineNo: 4,
          title: 'Boost your conversion rate',
          category: { name: 'Article', href: '#' },
          imageUrl:
          runningGears,
          author: {
            name: 'Roel Aufderehar',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
          },
          readingLength: '6 min',
        },
        {
          id: 5,
          machineNo: 5,
          title: 'Boost your conversion rate',
          category: { name: 'Article', href: '#' },
          imageUrl:
          runningGears,
          author: {
            name: 'Roel Aufderehar',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
          },
          readingLength: '6 min',
        },
        {
          id: 6,
          machineNo: 6,
          title: 'Boost your conversion rate',
          category: { name: 'Article', href: '#' },
          imageUrl:
          runningGears,
          author: {
            name: 'Roel Aufderehar',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
          },
          readingLength: '6 min',
        },
      ];

    return (
        <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
            <div className="relative">
              <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-semibold text-cyan-600">Learn</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">DTY Floor</p>

              </div>
              <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:grid-cols-3 lg:px-8">
                {machines.map((post) => ( 
                //   carddddd
                  <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                    <div className="flex-shrink-0">
                      <img className="h-84 w-full object-cover" src={post.imageUrl} alt="" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-cyan-600">
                            POY {post.poyType} to DTY {post.dtyType}
                        </p>
                        <a href={post.href} className="mt-2 block">
                          <p className="text-xl font-semibold text-gray-900">Machine #{post.machineNo}</p>
                          <p className="mt-3 text-base text-gray-500">{post.preview}</p>
                        </a>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <a href={post.author.href}>
                            <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt={post.author.name} />
                          </a>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            <a href={post.author.href} className="hover:underline">
                              {post.author.name}
                            </a>
                          </p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={post.datetime}>{post.date}</time>
                            <span aria-hidden="true">&middot;</span>
                            <span>{post.readingLength} read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                ))}
              </div>
            </div>
          </div>
    );
};

export default DtyFloorLayout;