import React from "react";

interface IWidgetProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const Widget = (props: IWidgetProps): JSX.Element => {
  const { title, value, icon } = props;

  return (
    <div className="flex items-start justify-start rounded-xl p-3 bg-[#243325] gap-3 lg:hover:scale-100 lg:scale-95 transition-all">
      <div className="text-white text-2xl">{icon}</div>
      <div>
        <p className="text-sm text-slate-300 mb-2">{title}</p>
        <p className="text-2xl text-white font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Widget;
