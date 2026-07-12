import { useEffect, useState } from "react";

const Navbar = () => {
  const NavPath: Array<string> = ["Home", "Abouts", "Releases"];
  const [Current, SetCurrent] = useState<string>("");

  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    SetCurrent(path !== "" ? path : "home");
  }, []);

  return (
    <>
      <div className="sticky top-0  z-30 rounded-2xl backdrop-blur-xl pt-3 pb-3">
        <div className="flex w-full px-10 md:gap-8 gap-5 justify-between items-center max-md:text-xs">
          <div className="w-5 h-5 ml-5 rounded-full bg-white overflow-hidden drop-shadow-2xl drop-shadow-violet-400/40 hover:drop-shadow-violet-400 transition duration-200 ease-in-out">
            <div>
              <img
                src="/logo/NyaTeam_BG.webp"
                alt="logo"
                width={50}
                className="object-center"
              />
            </div>
          </div>
          <div className="flex gap-5 text-white p-2 rounded-xl md:px-10 lg:ml-5 relative z-1">
            {NavPath.map((i, index) => (
              <a
                key={index}
                className={`border-violet-500/50  ${Current == i.toLowerCase() ? "border-b hover:border-transparent" : "hover:border-b"}`}
                href={i === "Home" ? "/" : `/${i.toLowerCase()}`}
                aria-label={`path to ${i}`}
              >
                <h1 className="drop-shadow-2xl drop-shadow-blue-300">{i}</h1>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
