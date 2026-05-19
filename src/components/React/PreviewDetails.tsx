import { useEffect, useState } from "react";
import { MdAnimation } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

interface GameAssetPack {
  id: string;
  name: string;
  preview: string;
  banner: string;
  itech_store: string;
  fab_store: string;
  unity_store: string;
  description: string;
  more_description: string;
  category: string[];
  is3D: boolean;
  tags: string[];
  anims: string[];
}

interface Props {
  details: GameAssetPack | undefined;
}

export const PreviewDetails = ({ details }: Props) => {
  if (!details) {
    return (window.location.href = "/error/404");
  }
  const [BaseAnims, setBaseAnims] = useState<Array<String>>();
  const [ProAnims, setProAnims] = useState<Array<String>>();

  function filterBaseAndProd() {
    const Base = details?.anims.filter((i) => i.toLowerCase().includes("__"));
    const Pro = details?.anims.filter((i) => !i.toLowerCase().includes("__"));

    if (Pro && Base) {
      setProAnims(Pro);
      setBaseAnims(Base);
    }
  }

  useEffect(() => {
    filterBaseAndProd();
  }, []);

  return (
    <div className="text-white leading-relaxed mt-5">
      <p>{details.more_description}</p>
      {details.anims.length > 0 && (
        <div>
          <h1 className="text-2xl py-5 flex items-center gap-3">
            {" "}
            <MdAnimation />
            All Animations List
          </h1>
          <div>
            <h1 className="pt-5 text-xl flex items-center gap-2">
              <GoDotFill />
              Demo Animations
            </h1>
            <div className="pt-5 grid md:grid-cols-5 grid-cols-2 gap-2 w-full select-text">
              {BaseAnims &&
                BaseAnims.map((i, index) => (
                  <div className="p-2 bg-black/30 text-white " key={index}>
                    {i.replaceAll("_", " ").trim()}
                  </div>
                ))}
            </div>
            <h1 className="pt-5 text-xl flex items-center gap-2">
              <GoDotFill />
              Other Animations
            </h1>
            <div className="pt-5 grid md:grid-cols-5 grid-cols-2 gap-2 w-full select-text">
              {ProAnims &&
                ProAnims.map((i, index) => (
                  <div className="p-2 bg-black/30 text-white " key={index}>
                    {i.replaceAll("_", " ").trim()}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <div className="mt-5 mb-10">
        <h1 className="text-2xl my-5">Available On</h1>
        {details.itech_store && (
          <a
            href={details.itech_store}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="bg-white w-30 p-1 rounded-xl"
              alt="itech"
              src="https://static.itch.io/images/logo-black-new.svg"
            />
          </a>
        )}
        {details.fab_store && (
          <a
            href={details.fab_store}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        )}
        {details.unity_store && (
          <a
            href={details.unity_store}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        )}
      </div>
    </div>
  );
};
