import Link from "next/link";
import { CarouseleComponent } from "./ui/carousele-component";


export default function Home() {
 
  return (
    <div className="flex justify-content">
      {/* <h1 className="black-text m-auto">Welcome Next Generation Users</h1> */}
      <CarouseleComponent/>
    </div>
  );
}
