import { memo } from 'react';

type DeparturesListSkeletonProps = {
  skeletonsAmout?: number;
};

const DeparturesListSkeleton = ({
  skeletonsAmout = 6,
}: DeparturesListSkeletonProps) => {
  console.log('DeparturesListSkeleton');
  return (
    <>
      <div className="flex flex-col gap-2 p-3 border-2 border-gray-500 dark:border-gray-700 rounded-xl">
        <div className="flex flex-col gap-2 w-full">
          <span className="bg-gray-300 dark:bg-white/10 h-4 w-6 rounded"></span>
          {[...Array(skeletonsAmout)].map((_, i) => (
            <div
              className="grid grid-flow-col gap-2 auto-cols-[_2.8rem_2fr_auto] w-full"
              key={i}
            >
              <span className="bg-gray-300 dark:bg-white/10 h-6"></span>
              <span className="bg-gray-300 dark:bg-white/10 h-6"></span>
              <span className="bg-gray-300 dark:bg-white/10 h-6 w-8"></span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(DeparturesListSkeleton);
