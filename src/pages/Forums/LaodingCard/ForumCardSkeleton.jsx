import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ForumCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition duration-300 flex flex-col w-full max-w-sm sm:max-w-[48%] md:max-w-[32%]">
      <Skeleton height={192} width="100%" />

      <div className="p-5 flex flex-col justify-between flex-grow">
        <Skeleton height={24} width="70%" className="mb-2" />

        <div className="flex items-start gap-3 mb-4">
          <Skeleton circle height={40} width={40} />
          <div className="flex-1">
            <Skeleton height={14} width="60%" />
            <Skeleton height={12} width="40%" />
          </div>
          <Skeleton height={20} width={60} borderRadius={999} />
        </div>

        <Skeleton count={3} height={12} className="mb-4" />

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-3 text-sm">
            <Skeleton height={20} width={40} />
            <Skeleton height={20} width={40} />
          </div>
          <Skeleton height={32} width={80} borderRadius={999} />
        </div>
      </div>
    </div>
  );
};

export default ForumCardSkeleton;
