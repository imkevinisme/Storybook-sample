"use client";

import React, { FC, useContext } from "react";

import { HiOutlineMenuAlt1 } from "react-icons/hi";

import SidebarContext from "./context";
import { SetSidebarState } from "./actions";
import { Button } from "@/components/ui/button";


const SidebarNavButton:FC = () => {
    const { isOpen, setIsOpen } = useContext(SidebarContext);

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => {
                const _isOpen = !isOpen;
                setIsOpen(_isOpen);

                // Server Action
                SetSidebarState(_isOpen ? 'true' : 'false');
            }}
        >
            <HiOutlineMenuAlt1 size={24} />
        </Button>
    );
};

export default SidebarNavButton;
