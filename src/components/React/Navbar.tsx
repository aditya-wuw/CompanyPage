import { useEffect, useState } from "react";
import lang from "../../data/language.json";
import { IoLanguage } from "react-icons/io5";

const Navbar = () => {
  const NavPath: Array<string> = ["Home", "abouts", "products"];
  const [Current, SetCurrent] = useState<string>("");
  const [CurrentLang, SetCurrentLang] = useState<string>("");

  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    SetCurrent(path !== "" ? path : "Home");
    console.log(CurrentLang);
  }, [CurrentLang]);

  return (
    <>
      <div className="flex md:gap-8 gap-5 justify-between items-center max-md:text-xs p-3 px-5">
        <div>
          <div className="w-10 h-10 rounded-full bg-transparent overflow-hidden drop-shadow-2xl drop-shadow-violet-400/40 hover:drop-shadow-violet-400 transition duration-200 ease-in-out">
            <img
              src="/logo/Logo.png"
              alt="logo"
              className="relative scale-150 top-1"
            />
          </div>
        </div>
        <div className="flex gap-5 text-white p-3 rounded-xl md:px-10 lg:ml-10">
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
        <div className="flex gap-3 items-center">
          <IoLanguage className="text-white" />
          <select
            className="text-white outline-0"
            defaultValue={lang[0]}
            onChange={(e) => SetCurrentLang(e.target.value)}
          >
            {lang.map((i, index) => (
              <option className="text-black" value={i} key={index}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;
