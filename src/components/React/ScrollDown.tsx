import { MdKeyboardDoubleArrowDown } from "react-icons/md";


const ScrollDown = () => {
  return (
    <div
      onClick={() => {
        let e = document.getElementById("scroll-target");
        if (e) {
          e.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className="cursor-pointer"
    >
      <MdKeyboardDoubleArrowDown className="animate-bounce text-white text-6xl" />
    </div>
  );
};

export default ScrollDown;
