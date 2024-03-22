import React from 'react';

const scrapers = [
  {
    name: 'face to face',
    timestamps: ['complete', 'complete', 'complete', 'complete', 'error']
  },
  {
    name: 'crystal-commerce',
    timestamps: ['complete', 'complete', 'complete', 'in_progress', 'complete']
  },
  {
    name: 'shopify',
    timestamps: ['complete', 'error', 'complete', 'complete', 'complete']
  },
  {
    name: 'conduct-commerce',
    timestamps: ['complete', 'complete', 'complete', 'complete', 'complete']
  }
];

const timePoints = [
  '09/15 2:00',
  '09/15 2:00',
  '09/15 2:00',
  '09/15 2:00',
  '09/15 2:00'
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'complete':
      return 'bg-green-500';
    case 'in_progress':
      return 'bg-yellow-500';
    case 'error':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const ScraperStatus = () => {
  return (
    <div className="w-full rounded bg-zinc-800 p-4">
      <h3 className="">Scraper Status</h3>
      <div className="flex flex-col text-xs">
        <div className="grid grid-cols-7 items-center gap-1 p-4 text-sm">
          {scrapers.map((scraper, index) => (
            <>
              <div className="col-span-2 line-clamp-1 text-left text-xs">
                {scraper.name}
              </div>
              {scraper.timestamps.map((status, index) => (
                <div
                  key={index}
                  className={`col-span-1 h-3 w-3 md:h-6 md:w-6 ${getStatusColor(
                    status
                  )} mx-auto`}
                ></div>
              ))}
            </>
          ))}
          <div className="col-span-2"></div>
          {timePoints.map((timePoint, index) => (
            <div key={index} className="text-center text-xs">
              {timePoint}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScraperStatus;