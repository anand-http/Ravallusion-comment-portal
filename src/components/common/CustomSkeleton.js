import { Skeleton } from "../ui/skeleton";

const CustomSkeleton = ({ count, className, skeletonClass }) => {
  return (
    <div className={"w-full h-full flex flex-col gap-4 " + className}>
      {Array.from({ length: count }).map((n, idx) => (
        <Skeleton
          key={idx}
          className={
            "w-full h-full animate-none rounded-none  " + skeletonClass
          }
        />
      ))}
    </div>
  );
};

export default CustomSkeleton;
