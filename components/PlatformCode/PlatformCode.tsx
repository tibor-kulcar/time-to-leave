type PlatformCodeProps = {
  code: string;
};

const PlatformCode = ({ code }: PlatformCodeProps) => {
  // console.log('PlatformCode');
  return (
    <div className="text-left">
      {code ? (
        <span
          className="
          px-2 py-0.5
          rounded-md border border-gray-700
          text-gray-700 font-semibold text-xs
        "
        >
          {`${code} `}
        </span>
      ) : null}
    </div>
  );
};

export default PlatformCode;
