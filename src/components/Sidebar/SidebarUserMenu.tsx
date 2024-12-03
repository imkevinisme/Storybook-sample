import React, { FC, useContext } from "react";
import { PiGear, PiLock, PiUserCircle } from "react-icons/pi";
import { CircleUser } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SidebarContext from "./context";
import { ProxySignOut } from "@/auth/ProxiesFuncs";
import { SessionWithUserInfo } from "@/types/session";

interface Props {
    className?: string;
    session: SessionWithUserInfo;
}

const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
}

const SidebarUserMenu: FC<Props> = ({ className, session }) => {
    const { isOpen } = useContext(SidebarContext);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={`w-full flex items-center gap-2 p-8 ${isOpen ? 'justify-start' : 'justify-center'} ${className}`}
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/ashadcn.png" alt="User avatar" />
                        <AvatarFallback>
                            {getUserInitials(session.user?.name || '')}
                        </AvatarFallback>
                    </Avatar>
                    {isOpen && (
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">{session.user?.name}</span>
                            <small className="text-xs text-muted-foreground">{session.user?.email}</small>
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                    <PiUserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <PiGear className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => ProxySignOut(session)} className="text-red-500">
                    <PiLock className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SidebarUserMenu;

