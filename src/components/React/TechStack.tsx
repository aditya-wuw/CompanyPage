import { SiBlender, SiGodotengine } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { GiPaintBrush } from "react-icons/gi";

const tools = [
  { name: "Blender", icon: <SiBlender />, color: "#F5792A" },
  { name: "Godot", icon: <SiGodotengine />, color: "#478CBF" },
  { name: "Krita", icon: <GiPaintBrush />, color: "#31A8FF" },
  { name: "VS Code", icon: <VscVscode />, color: "#007ACC" },
];

export default function TechStack() {
  return (
    <div className="flex justify-start md:gap-5 gap-3  text-white ">
      {tools.map((tool) => (
        <div
          key={tool.name}
          className="group flex flex-col items-center transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <div className="md:text-3xl text-xl opacity-60 group-hover:opacity-100">
            {tool.icon}
          </div>
          <span className="absolute top-10 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity w-full">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
}
