import React, { FC } from "react";


import SidebarNavButton from "@/components/Sidebar/SidebarNavButton";
import ThemeSwitcher from "@/components/NextThemes/ThemeSwitcher";
// import UserMenu from "./UserMenu";

// import { SessionWithUserInfo } from "@/types/session";

// interface Props {
//     session: SessionWithUserInfo;
// }

// const NavBar: FC<Props> = ({ session }) => {

const NavBar: FC = () => {

    return (
        <header className="sticky top-0 z-30 flex items-center gap-4 backdrop-blur-sm bg-white/20 dark:bg-slate-700 dark:bg-opacity-10 back px-4 py-4 h-auto">
            <SidebarNavButton />
            <div className="flex items-center gap-4 ms-auto">
                <ThemeSwitcher />
                {/* <UserMenu session={session} /> */}
            </div>
        </header>
    );
};

export default NavBar;
