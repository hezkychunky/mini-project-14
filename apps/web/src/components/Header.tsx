export const Header = () => {
  return (
    <div className="w-[1920px] h-24 relative bg-white">
      <div className="w-[220px] h-20 left-0 top-[8px] absolute" />
      <div className="left-[340px] top-[38px] absolute justify-start items-start gap-[57px] inline-flex">
        <div className="w-20 h-9 relative">
          <div className="h-6 left-0 top-0 absolute justify-center items-center gap-2 inline-flex">
            <div className="text-[#2d2e2e] text-base font-semibold font-['Inter']">Plan</div>
            <div className="w-6 h-6 relative" />
          </div>
        </div>
        <div className="justify-center items-center gap-2 flex">
          <div className="text-[#2d2e2e] text-base font-semibold font-['Inter']">My bookings</div>
          <div className="w-6 h-6 relative" />
        </div>
        <div className="text-[#2d2e2e] text-base font-semibold font-['Inter']">Hotels car here</div>
      </div>
      <div className="w-6 h-6 left-[1436px] top-[38px] absolute" />
      <div className="w-6 h-6 left-[1872px] top-[38px] absolute" />
    </div>
  );
};
