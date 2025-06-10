import { useState } from "react";
import SIDEBAR from "./sidebar";
import CHATBOX from "./ChatBox";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useAuthContext } from "../context/AuthContext";
import ProfileUpdate from "./profileUpdate";
function HOME() {
  const { authUser, setAuthUser } = useAuthContext();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { loading, logout } = useLogout();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleOpenProfileUpdate = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileUpdate = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
      <div className="centered-div  w-[90%] h-[95%] md:w-[95%] md:h-[95%] ">
        <div>
          <div className="flex justify-between items-center text-white px-4 py-4 md:px-24">
            <p className="text-[28px] md:text-[36px]">
              <span>ChatApp</span>
            </p>
            <div className="flex justify-end items-center">
              <p className="text-[10px] md:text-[18px] w-[5rem] md:w-[10rem] text-left overflow-hidden whitespace-nowrap text-ellipsis">
                Logged in as: <br /> <span>{authUser.fullName}</span>
              </p>
              <button
                onClick={handleOpenProfileUpdate}
                className="text-[28px] md:text-[48px] text-white pr-2 pl-1 md:pl-2 md:pr-8 cursor-pointer flex-shrink-0"
                title="Profile"
              >
                <img
                  className="w-[42px] h-[42px] md:h-[48px] md:w-[48px] rounded-full object-cover border border-gray-500"
                  src={authUser.profilePic}
                  alt="Profile"
                />
              </button>
              {isProfileModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-black rounded p-6 w-full max-w-md">
                    <ProfileUpdate
                      user={authUser}
                      onClose={handleCloseProfileUpdate}
                      onUpdate={(updatedUser) => {
                        setAuthUser(updatedUser); // assuming you're managing authUser in state
                        handleCloseProfileUpdate();
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="">
                {!loading ? (
                  <Link to="/login">
                    <button
                      className="text-[42px] md:text-[46px] font-bold text-cyan-400 cursor-pointer"
                      title="Logout"
                    >
                      <CiLogout onClick={logout} />
                    </button>
                  </Link>
                ) : (
                  <span className="loader"></span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="home w-full h-[85%] md:h-[80%]  ">
          <div
            className={`w-full md:w-[20%] ${
              isChatOpen ? "hidden" : "block"
            } sm:block`}
          >
            <SIDEBAR onSelectProfile={() => setIsChatOpen(true)} />
          </div>
          <div
            className={` sm:w-full  md:w-[60%] ${
              isChatOpen ? "block" : "hidden"
            } sm:block`}
          >
            <CHATBOX onBack={() => setIsChatOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
}
export default HOME;
