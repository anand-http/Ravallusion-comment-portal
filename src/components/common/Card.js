const Card = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={
        "p-3 flex flex-col items-start gap-2 bg-[var(--card)] text-white rounded-2xl  sm:w-full " +
        className
      }
    >
      {children}
    </div>
  );
};

export default Card;
