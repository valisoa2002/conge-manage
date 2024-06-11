import { RxHamburgerMenu } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { useStateContext } from "../../contexts/ContextProvider";

function Navbar() {
  const { user, setActiveMenu } = useStateContext();

  return (
    <div className="fixed md:static w-full ">
      <div className="flex justify-between p-2 md:mx-6 relative">
        <button
          className="relative"
          onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        >
          <span className="absolute inline-flex text-xl right-2 top-1">
            <RxHamburgerMenu />
          </span>
        </button>

        <div className="flex">
          <button>
            <span className="absolute inline-flex right-2 top-2"></span>
            <FiSettings className="w-5 h-5" />
          </button>

          <p className="text-gray-500 ml-3">
            Hello,{" "}
            <span className="font-bold text-lg text-slate-700 capitalize">
              {user.name}
            </span>
          </p>

          <img
            src="./vite.svg"
            alt="avatar"
            className="w-7 h-7 ml-2 flex items-center rounded-full border-purple-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
