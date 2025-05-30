import { FaTrash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import {
  currentIndexState,
  selectedWalletState,
  walletsState,
} from "../store/atoms/walletAtoms";

const DeleteWallet = () => {
  const [wallets, setWallets] = useRecoilState<any>(walletsState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [selectedWallet, setSelectedWallet] =
    useRecoilState<any>(selectedWalletState);

  const handleDeleteWallet = () => {
    const deleteWallet = confirm(
      "Are you sure you want to delete the selected Wallet?"
    );

    if (deleteWallet) {
      let deletedWalletIndex: any;

      if (selectedWallet) {
        const updatedWallets = wallets
          .filter((w: any, index: number) => {
            if (w.name === selectedWallet.name) deletedWalletIndex = index;

            return index !== deletedWalletIndex;
          })
          .map((wallet: any, index: number) => {
            if (index >= deletedWalletIndex) {
              return { ...wallet, name: `Wallet ${index + 1}` };
            }

            return wallet;
          });

        setWallets(updatedWallets);
        setCurrentIndex(currentIndex - 1);

        if (updatedWallets.length > deletedWalletIndex) {
          setSelectedWallet(updatedWallets[deletedWalletIndex]);
        } else {
          setSelectedWallet(updatedWallets[deletedWalletIndex - 1]);
        }
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleDeleteWallet}
        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
        title="Delete selected wallet"
      >
        <FaTrash className="m-1" />
      </button>
    </div>
  );
};

export default DeleteWallet;
