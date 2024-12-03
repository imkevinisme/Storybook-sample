import { createContext } from "react";


type SidebarContextProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const SidebarContext = createContext<SidebarContextProps>({
    isOpen: true,
    setIsOpen: () => {},
});

export default SidebarContext;
