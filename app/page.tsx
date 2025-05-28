import AllowUSDC from "@/component/AllowUSDC";
import TotalSupply from "@/component/TotalSupply";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div>hello sunil
      <ConnectButton />
      <TotalSupply />
      <AllowUSDC />
    </div>
  );
}
