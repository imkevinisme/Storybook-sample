"use client";

import React, { FC, useContext } from "react";
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { PiMonitor, PiGear, PiUser, PiLock, PiTruck, PiUsersThree, PiSlidersHorizontal, PiShieldCheck, PiShieldCheckered, PiHardDrive, PiHardDrives } from "react-icons/pi";

import { Separator } from "@/components/ui/separator";
import OunchLogo from "@/assets/ounch_o_only.png";

import SidebarContext from "./context";
import SidebarItem from "./SidebarItem";
import SidebarUserMenu from "./SidebarUserMenu";
import { SessionWithUserInfo } from "@/types/session";

interface Props {
    session: SessionWithUserInfo;
}

const Sidebar: FC<Props> = ({ session }) => {
    const pathName = usePathname();
    const { isOpen } = useContext(SidebarContext);

    return (
        <aside
            className={`
                shrink-0
                sticky top-0 z-10
                bg-white transition-width dark:bg-slate-900 border-r dark:border-slate-800 shadow-sm md:flex h-screen
                ${isOpen ? "w-[255px]" : "w-[72px]"}
            `}> { /** hidden */}
            <nav className="h-full flex flex-col w-full">

                {/* Header */}
                <div className={`${isOpen ? 'px-4 py-3' : 'p-2 justify-center'} overflow-hidden border-b dark:border-slate-800 w-full flex items-center gap-3 transition-all shrink-0`}>
                    <Link href="/app" className="">
                        <div
                            className={`
                                w-[48px] h-[48px]
                            `}
                        >
                            <Image src={OunchLogo} alt="Marc Logo" className="img-fluid" />
                        </div>
                    </Link>

                    {isOpen && <div className="text-sm">
                        <h6 className="font-medium">ODS</h6>
                        <p className="text-xs">Workspace</p>
                    </div>}

                </div>

                <div className="flex flex-col flex-1 p-3">
                    <SidebarItem href="/app/dashboard" icon={<PiMonitor size={'22px'} />} text="Dashboard" active={pathName === '/app/dashboard'} />
                    <SidebarItem href="/app/suppliers" icon={<PiTruck size={'22px'} />} text="Suppliers" active={pathName.includes('/app/suppliers')} />
                    <SidebarItem href="/app/customers" icon={<PiUsersThree size={'22px'} />} text="Customers" active={pathName === '/app/customers'} />
                    <SidebarItem href="/app/hardwares" icon={<PiMonitor size={'22px'} />} text="Hardwares" active={pathName === '/app/hardwares'} />

                    <Separator className="my-2" />

                    <SidebarItem
                        icon={<PiShieldCheck size={'22px'} />}
                        text="Admin"
                        active={pathName.includes('/admin')}
                        groupItems={[
                            {
                                href: "/app/users",
                                icon: <PiUser size={'18px'} />,
                                text: "Users",
                                active: pathName.includes('/app/users')
                            },
                            {
                                href: "/app/role",
                                icon: <PiLock size={'18px'} />,
                                text: "Roles",
                                active: pathName.includes('/app/role')
                            },
                            {
                                href: "/app/permissions",
                                icon: <PiShieldCheckered size={'18px'} />,
                                text: "Permissions",
                                active: pathName.includes('/app/permissions')
                            }
                        ]}
                    />

                    <Separator className="my-2" />

                    <SidebarItem
                        icon={<PiSlidersHorizontal size={'22px'} />}
                        text="Settings"
                        active={pathName.includes('/settings')}
                        groupItems={[
                            {
                                href: "/app/settings/general",
                                icon: <PiGear size={'18px'} />,
                                text: "General",
                                active: pathName.includes('/app/settings/general')
                            },
                            {
                                href: "/app/settings/hardware-models",
                                icon: <PiHardDrive size={'18px'} />,
                                text: "HW Models",
                                active: pathName.includes('/app/settings/hardware-models')
                            },
                            {
                                href: "/app/settings/hardware-categories",
                                icon: <PiHardDrives size={'18px'} />,
                                text: "HW Categories",
                                active: pathName.includes('/app/settings/hardware-categories')
                            }
                        ]}
                    />
                </div>



                {/* Footer */}
                <div className={`${isOpen ? 'justify-between' : 'justify-center'} border-t w-full flex items-center  gap-3 mt-auto`}>
                    <SidebarUserMenu session={session} />
                </div>


            </nav>

        </aside>
    );
};

export default Sidebar;



