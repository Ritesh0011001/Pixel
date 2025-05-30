import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { isMnemonicEmptyState, userState } from "@/store/atoms/globalAtoms";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useRecoilState(userState);
  const isMnemonicEmpty = useRecoilValue(isMnemonicEmptyState);

  return (
    <nav className="sticky top-0 flex justify-between items-center px-2 md:px-4 mb-24">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => {
          if (!isMnemonicEmpty) navigate("/select-blockchain");
          else navigate("/");
        }}
      >
        <Logo />
        <span className="text-2xl font-bold text-white">Pixel</span>
      </div>

      <div className="flex font-bold space-x-2 md:space-x-4">
        {name && (
          <div className="py-2 px-4 text-red-300 bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-lg transition duration-300">
            <button
              onClick={() => {
                localStorage.clear();
                setName("");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        )}

        <div className="py-2 px-4 text-white bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-lg transition duration-300">
          <a
            href="https://github.com/Ritesh0011001/Pixel.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
