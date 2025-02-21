import HelpCard from "@/components/HelpCard";
import TraitCard from "@/components/TraitCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import { traitRawData, HelpRawData } from "../raw data/indexPage";
import teams from "../raw data/teams";
import TeamCard from "@/components/TeamCard";
import Winbox from "@/components/winbox";


export default function Home() {
  const about_mount=(
    <div className="flex flex-col items-center text-start gap-10">
          <p className="text-[32px]">
            Welcome to <br />
            <b className="text-purple-100">Robotics</b> <br />
            Society <br />
          </p>
          <p className="text-[18px] tracking-tight font-light max-2xl:text-[22px]">
            One of the <b className="text-purple-100">leading</b> Indian
            On-Campus Robotics Society <br />
            Representing India and Punjab Engineering College at an <br />
            international scale{" "}
          </p>
          <div className="flex flex-row items-center justify-center gap-4">
            <button className="border rounded-lg border-purple-100 w-36 py-1 text-[20px] text-purple-100">
              Register
            </button>
            <button className="bg-purple-100 hover:bg-opacity-35 rounded-lg text-[20px] w-36 py-1">
              Learn More
            </button>
          </div>
        </div>
  )
  const team_mount = (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-[32px]">Meet The Team</p>
      <div className="flex flex-row items-center justify-center gap-40">
        {teams
          .filter((teamMember) => 
            teamMember.name.includes("Lalit") || teamMember.name.includes("Shashank")
          )
          .map((teamMember, index) => (
            <TeamCard
              img={teamMember.img}
              name={teamMember.name}
              designation={teamMember.designation}
              key={index}
            />
          ))}
      </div>
    </div>
  );

  const project_mount=(
    <div className="flex flex-col items-center justify-center text-center gap-12">
        <p className="text-[48px]">Have a look at some of our projects👀</p>
        <p className="text-[24px]">
          At the PEC Robotics Society,{" "}
          <b className="text-purple-100">innovation is key&#33;</b> 🤖💡 The best
          way to learn robotics is by <b className="text-purple-100">building</b>{" "}
          <br />
          <b className="text-purple-100">your own projects</b>—and that&apos;s
          exactly what we do&#33; From juniors to seniors, everyone here
          <br /> creates and shares their amazing work. 🛠️🚀
          <br /> Check out the cool projects, from{" "}
          <b className="text-purple-100">AI-driven bots to robotic arms</b>, all
          made by our talented <br /> members. Each project reflects our passion
          for <b className="text-purple-100">pushing boundaries</b> and solving
          real-world <br />
          problems. 🌟{" "}
          <b className="text-purple-100">
            Come explore, get inspired, and start building with us&#33;
          </b>{" "}
          🎉
        </p>
        <button className="text-[20px] py-2 px-5 bg-[#6157C9CC] rounded-full flex items-center justify-center">
          Projects🔨
        </button>
      </div>
  )
  const blog_mount=(
    <div className="relative flex flex-col items-stretch justify-center gap-10">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[70%] h-[70%] bg-white opacity-5 blur-[80px] transform -rotate-45"></div>
        </div>
        <p className="text-[64px] text-center">
          How will joining Robotics Help you 🤔
        </p>
        {HelpRawData.map((help, index) => {
          return (
            <HelpCard
              img={help.img}
              heading={help.heading}
              subHeading={help.subheading}
              isOdd={index % 2 == 0}
              key={index}
            />
          );
        })}
      </div>
  )


      return (
      <main>
        <Winbox title="About Us" mount={about_mount} buttonX="2%" buttonY="10%" openByDefault={true} />
        <Winbox title="The Team" mount={team_mount} buttonX="2%" buttonY=" 25%" />
        <Winbox title="Blog" mount={blog_mount} buttonX="2%" buttonY="40%" />
        <Winbox title="Projects" mount={project_mount} buttonX="10%" buttonY="10%" />
      </main>
      );
}
