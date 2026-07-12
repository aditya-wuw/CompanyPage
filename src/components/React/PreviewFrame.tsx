import { useEffect, useState } from "react";
import { PreviewDetails } from "./PreviewDetails";

interface Props {
  asset: GameAssetPack;
}

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

const PreviewFrame = ({ asset }: Props) => {
  const [PrevDetails, setPreviewDetails] = useState<GameAssetPack>();

  useEffect(() => {
    if (asset) {
      setPreviewDetails(asset);
    } else {
      window.location.href == "error/494";
    }
  }, []);

  return (
    <div className="mt-2 select-none">
      <div className="flex justify-between gap-2 h-10 mb-2">
        <div className="flex items-center pb-2 mt-2">
          <div className="text-white md:text-2xl text-md">
            {PrevDetails?.name}
          </div>
        </div>
        <div className="flex gap-3 px-2">
          <a
            href={PrevDetails?.itech_store}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white text-xl max-sm:hidden"
          >
            Get it on
            <img
              className="bg-white w-20 p-3 rounded-xl"
              alt="itech"
              src="https://static.itch.io/images/logo-black-new.svg"
            />
          </a>
        </div>
      </div>
      <div className="w-full md:h-164 h-54 rounded-2xl overflow-y-auto bg-linear-to-b from-purple-950/10 from-15%">
        <iframe
          src={`${import.meta.env.PUBLIC_ASSETS}/${asset.id}`}
          title="Godot Game"
          allow="cross-origin-isolated"
          className="w-full h-full rounded-2xl"
          style={{ border: "none" }}
          scrolling="no"
        />
      </div>
      <div>
        <PreviewDetails details={PrevDetails} />
      </div>
    </div>
  );
};

export default PreviewFrame;
