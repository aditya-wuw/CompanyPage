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
        <div className="w-5 h-5 rounded-full bg-white overflow-hidden drop-shadow-2xl drop-shadow-violet-400/40 hover:drop-shadow-violet-400 transition duration-200 ease-in-out">
          <div>
            <img
              src="/logo/NyaTeam_BG.webp"
              alt="logo"
              width={50}
              className="object-center"
            />
          </div>
        </div>
        <div className="flex gap-5 text-white p-3 rounded-xl md:px-10 lg:ml-10">
          {NavPath.map((i, index) => (
            <a
              key={index}
              className={` border-violet-500/50 ${Current == i ? "border-b hover:border-none" : "hover:border-b"}`}
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
              <option className="bg-slate-800" value={i} key={index}>
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
