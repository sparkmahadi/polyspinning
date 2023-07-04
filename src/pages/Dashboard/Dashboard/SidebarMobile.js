import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMobile = ({navigation, classNames}) => {
    return (
        <nav className="mt-5 space-y-1 px-2">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    to={item.link}
                    className={classNames(
                        item.current
                            ? 'bg-indigo-800 text-white'
                            : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    )}
                >
                    <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

export default SidebarMobile;