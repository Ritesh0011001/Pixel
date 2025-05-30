import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Header from "@/components/Header";
import SupportedChains from "@/components/SupportedChains";
import Mnemonic from "@/components/Mnemonic";
import BottomNavbar from "@/components/BottomNavbar";
import { isMnemonicEmptyState, mnemonicState } from "@/store/atoms/globalAtoms";
import {
  selectedBlockChainState,
  showMnemonicState,
} from "@/store/atoms/uiAtoms";
import {
  currentIndexState,
  selectedWalletState,
  walletsState,
} from "@/store/atoms/walletAtoms";

const SelectBlockchain = () => {
  const setMnemonic = useSetRecoilState(mnemonicState);
  const setIsMnemonicEmpty = useSetRecoilState(isMnemonicEmptyState);
  const setShowMnemonic = useSetRecoilState(showMnemonicState);
  const setWallets = useSetRecoilState(walletsState);
  const setCurrentIndex = useSetRecoilState(currentIndexState);
  const setSelectedWallet = useSetRecoilState(selectedWalletState);
  const setSelectedBlockchain = useSetRecoilState(selectedBlockChainState);

  useEffect(() => {
    setWallets([]);
    setCurrentIndex(0);
    setSelectedWallet(null);
    setSelectedBlockchain(null);

    const mnemonic = localStorage.getItem("mnemonic");

    if (mnemonic) {
      setMnemonic(mnemonic.split(" "));
      setShowMnemonic(false);
      setIsMnemonicEmpty(false);
    }
  }, []);

  return (
    <div>
      <div className="px-6">
        <Header />

        <div className="pt-6 mb-24">
          <SupportedChains />
        </div>
      </div>

      <div className="px-4 md:px-6">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl mx-auto space-y-4">
          <Mnemonic />
        </div>

        <BottomNavbar />
      </div>
    </div>
  );
};

export default SelectBlockchain;
