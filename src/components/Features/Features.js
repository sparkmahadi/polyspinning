import React from 'react';

const Features = () => {
          {/* Feature section with screenshot */}

    return (
        <div className="relative bg-gray-50 pt-16 sm:pt-24 lg:pt-32">
            <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
              <div>
                <h2 className="text-lg font-semibold text-cyan-600">Serverless</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  No server? No problem.
                </p>
                <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
                  Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
                  malesuada. Eleifend condimentum id viverra nulla.
                </p>
              </div>
              <div className="mt-12 -mb-10 sm:-mb-24 lg:-mb-80">
                <img
                  className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                  src="https://tailwindui.com/img/component-images/green-project-app-screenshot.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
    );
};

export default Features;