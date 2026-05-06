import { useEffect, useState } from "react";

const Navbar = () => {
  const NavPath: Array<string> = ["Home", "abouts", "products"];
  const [Current, SetCurrent] = useState<string>("");

  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    SetCurrent(path !== "" ? path : "Home");
  }, []);

  return (
    <>
      <div className="flex md:gap-8 gap-5 justify-between items-center max-md:text-xs p-3 px-5">
        <div></div>
        <div className="flex gap-5 text-white p-3 rounded-xl md:px-10 ml-10">
          {NavPath.map((i, index) => (
            <a
              key={index}
              className={` border-blue-500/50 ${Current == i ? "border-b hover:border-none" : "hover:border-b"}`}
              href={i === "Home" ? "/" : `/${i}`}
            >
              <h1 className="drop-shadow-2xl drop-shadow-blue-300">{i}</h1>
            </a>
          ))}
        </div>
        <div className="md:w-15 md:h-15 w-10 h-10 rounded-full bg-transparent overflow-hidden drop-shadow-2xl drop-shadow-violet-400/40 hover:drop-shadow-violet-400 transition duration-200 ease-in-out">
          <img
            src="/logo/Logo.png"
            alt="logo"
            className="relative top-1.5 scale-120"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
