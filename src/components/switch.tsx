interface ISwitchProps {
  preText: string;
  suffixText: string;
  isAdmin: boolean;
  handleChange: () => void;
}

const Switch = (props: ISwitchProps) => {
  const { preText, suffixText, isAdmin, handleChange } = props;
  return (
    <>
      <label className="relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={handleChange}
          className="sr-only"
        />
        <span className="label flex items-center text-xs font-medium text-white">
          {preText}
        </span>
        <span
          className={`mx-4 flex h-4 w-10 items-center rounded-full duration-200 ${
            isAdmin ? "bg-[#7d8945]" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-5 w-5 rounded-full duration-200 ${
              isAdmin ? "translate-x-[22px] bg-[#e5fd72]" : "bg-white"
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-xs font-medium text-white">
          {suffixText}
        </span>
      </label>
    </>
  );
};

export default Switch;
