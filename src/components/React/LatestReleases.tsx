import { useEffect, useState } from "react";
import CompanyUpdates from "../core/Home/CompanyUpdates.astro";

interface LatestAsset {
  banner: string;
  name: string;
}

const ApiPath: string = `${import.meta.env.PUBLIC_ASSETS}/info?id=${0}`;
const LatestReleases = () => {
  const [Latest, SetLatest] = useState<LatestAsset | null>(null);

  const FetchData = async () => {
    try {
      const res = await fetch(ApiPath, { method: "GET" });
      let LatestAsset = (await res.json()) as LatestAsset;
      SetLatest(LatestAsset);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  if (!Latest) return;
  return (
    <div>
      <CompanyUpdates LatestAsset={Latest} />
    </div>
  );
};

export default LatestReleases;
