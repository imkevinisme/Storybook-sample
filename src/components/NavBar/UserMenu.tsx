"use client"
import React, { FC } from "react";
import { PiGear, PiLock, PiUserCircle } from "react-icons/pi";
import { CircleUser } from 'lucide-react';
// import Image from "next/image";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
// import { SessionWithUserInfo } from "@/types/session";
// import { ProxySignOut } from "@/auth/ProxiesFuncs";

// import UserIcon from './user.webp';


interface Props {
    session: SessionWithUserInfo;
}

const UserMenu: FC<Props> = ({ session }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    {/* <Image
                        src={UserIcon}
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    /> */}
                    <CircleUser size={20} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">

                <DropdownMenuLabel className="flex flex-col">
                    <span>{session.user?.name}</span>
                    <small className="text-muted">{session.user?.email}</small>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem disabled>
                    <PiUserCircle size={22} className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem disabled>
                    <PiGear size={22} className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-500" onClick={() => ProxySignOut(session)}>
                    <PiLock size={22} className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
