type PlatformCodeProps = {
  code: string;
};

const PlatformCode = ({ code }: PlatformCodeProps) => {
  // console.log('PlatformCode');
  return (
    <div className="pb-2 text-left">
      {code ? (
        <span
          className="
          px-2 py-0.5
          rounded-lg border-2 border-bone-600 dark:border-bone-800
          text-bone-800 dark:text-bone-400 font-bold text-xs leading-none
        "
        >
          {`${code} `}
        </span>
      ) : null}
    </div>
  );
};

export default PlatformCode;
