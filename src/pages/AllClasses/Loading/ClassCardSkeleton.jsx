import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ClassCardSkeleton = () => {
  return (
    <div className="bg-secondary shadow-[9px_9px_0px_0px_#432365] pb-6 w-full max-w-sm sm:max-w-[48%] md:max-w-[32%] lg:max-w-[30%]">
      <Skeleton height={240} width="100%" />
      <div className="px-6 pt-4 w-full">
        <Skeleton height={28} width="70%" className="mb-2" />
        <Skeleton height={20} width="50%" className="mb-2" />
        <Skeleton count={3} height={14} className="mb-1" />
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Skeleton circle height={40} width={40} />
          <Skeleton circle height={40} width={40} />
          <Skeleton circle height={40} width={40} />
        </div>
        <Skeleton height={20} width="50%" className="mt-4 mx-auto" />
      </div>
    </div>
  );
};

export default ClassCardSkeleton;
