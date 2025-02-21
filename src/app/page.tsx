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
  const about=<div><p>hello</p></div>
  return (
    <main>
      <Winbox title="About Us" mount={about} buttonX="2%" buttonY="10%" openByDefault={true}/>
      <Winbox title="The Team" mount={about} buttonX="2%" buttonY=" 25%" />
      <Winbox title="Blog" mount={about} buttonX="2%" buttonY="40%" />
      <Winbox title="Projects" mount={about} buttonX="10%" buttonY="10%"/>
    </main>
  );
}
