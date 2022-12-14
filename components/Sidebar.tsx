import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { Discover, Footer, SuggestedAccounts } from "./index";
import useAuthStore from "../store/authStore";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const {userProfile} = useAuthStore();
  const normalLink =
    "flex items-center gap-3 hover:bg-primary px-3 py-2 mr-1 justify-center xl:justify-start cursor-pointer font-semibold text-[#1eaa9f] rounded";
  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle size={20} /> : <AiOutlineMenu size={20}/>}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For you</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                Log in to like and comment on videos
              </p>
            </div>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
