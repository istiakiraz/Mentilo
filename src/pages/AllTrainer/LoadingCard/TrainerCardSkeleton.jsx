import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TrainerCardSkeleton = () => {
  return (
    <div className="bg-secondary shadow-[5px_5px_0px_0px_#432365] pb-6 rounded-2xl w-full max-w-sm sm:max-w-[48%] md:max-w-[30%]">
      {/* Top Image */}
      <Skeleton height={200} width="100%" className="rounded-t-2xl" />

      {/* Card Content */}
      <div className="px-6 pt-3">
        {/* Name & Social */}
        <div className="flex items-center justify-between mb-2">
          <Skeleton height={24} width="60%" />
          <div className="flex gap-2">
            <Skeleton circle height={20} width={20} />
            <Skeleton circle height={20} width={20} />
          </div>
        </div>

        {/* Experience */}
        <Skeleton height={18} width="70%" className="mb-2" />

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-1 mb-2">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              height={24}
              width={60}
              borderRadius={999}
              className="inline-block"
            />
          ))}
        </div>

        {/* Available Days */}
        <div className="flex gap-2 flex-wrap text-sm mt-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={16} width={50} />
          ))}
        </div>
      </div>

      {/* See Details Button */}
      <div className="px-6 mt-4 flex justify-end">
        <Skeleton height={36} width={110} borderRadius={8} />
      </div>
    </div>
  );
};

export default TrainerCardSkeleton;
