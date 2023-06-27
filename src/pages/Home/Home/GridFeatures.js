import React from 'react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartBarIcon,
  CloudArrowUpIcon,
  CogIcon,
  LockClosedIcon,
  ServerIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';

const GridFeatures = () => {
  {/* Feature section with grid */ }

  const features = [
    {
      name: 'Current Floor Status',
      description: 'Explore Latest DTY Floor Status with details of materials and production flow',
      icon: ChartBarIcon,
      link: "/dty-floor-status/"
    },
    {
      name: 'DTY Machines',
      description: 'Explore Latest DTY Floor Status with details of materials and production flow',
      icon: ChartBarIcon,
      link: "/dty-floor-status/dty-machines/"
    },
    {
      name: 'DTY Process Parameters',
      description: 'Explore DTY process parameters in a sheet',
      icon: LockClosedIcon,
      link: "/dty-process-parameters"
    },
    {
      name: 'POY',
      description: 'Explore Latest DTY Floor Status with details of materials and production flow',
      icon: ArrowPathIcon,
      link: "/poy-floor-status/"
    },
    {
      name: 'Advanced Security',
      description: 'Ullam laboriosam est voluptatem maxime ut mollitia commodi. Et dignissimos suscipit perspiciatis.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Powerful API',
      description:
        'Ab a facere voluptatem in quia corrupti veritatis aliquam. Veritatis labore quaerat ipsum quaerat id.',
      icon: CogIcon,
    },
    {
      name: 'Database Backups',
      description: 'Quia qui et est officia cupiditate qui consectetur. Ratione similique et impedit ea ipsum et.',
      icon: ServerIcon,
    },
  ]

  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-cyan-600">Deploy faster</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to deploy your app
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
          malesuada. Eleifend condimentum id viverra nulla.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link to={feature.link} key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridFeatures;