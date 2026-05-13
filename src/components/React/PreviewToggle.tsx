import { useEffect, useState } from "react";
import { PreviewDetails } from "./PreviewDetails";

interface Props {
  id: string;
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

const PreviewToggle = ({ id }: Props) => {
  // 1. Create a local state to track which view to show
  const [showPreview, setShowPreview] = useState(true);
  const [PrevDetails, setPreviewDetails] = useState<GameAssetPack>();

  // 2. Helper function to handle the click
  const handleToggle = (val: boolean) => {
    setShowPreview(val);
  };

  useEffect(() => {
    const ses = sessionStorage.getItem("view");
    if (ses) {
      setPreviewDetails(JSON.parse(ses));
    }
  }, []);

  return (
    <div className="mt-2 select-none">
      <div className="flex justify-between gap-2 h-10 mb-2">
        <div className="flex items-center pb-2 mt-2">
          <div className="text-white md:text-2xl text-xs">
            {PrevDetails?.name}
          </div>
        </div>
        <div className="flex gap-3">
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
          <button
            className={`cursor-pointer p-1.5 rounded-md transition-colors ${
              showPreview
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-400"
            }`}
            onClick={() => handleToggle(true)}
          >
            Preview
          </button>
          <button
            className={`cursor-pointer p-1.5 rounded-md transition-colors ${
              !showPreview
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-400"
            }`}
            onClick={() => handleToggle(false)}
          >
            Details
          </button>
        </div>
      </div>

      <div>
        <div className="md:h-170 max-[400px]:h-110 h-150 overflow-y-auto">
          {showPreview ? (
            <div className="w-full md:h-164 h-54 rounded-2xl">
              <iframe
                src={`${import.meta.env.PUBLIC_ASSETS}/${id}`}
                title="Godot Game"
                allow="cross-origin-isolated"
                className="w-full h-full rounded-2xl"
                style={{ border: "none" }}
                scrolling="no"
              />
            </div>
          ) : (
            <PreviewDetails details={PrevDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewToggle;
