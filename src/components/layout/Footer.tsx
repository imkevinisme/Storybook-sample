import React, { FC } from "react";

// import { env } from "@/global/env/server";


interface Props {
    className?: string;
}

const FooterApp: FC<Props> = ({
    className = ''
}) => {
    return (
        <footer className={`py-10 ${className} `}>
            <div className="px-6">
                <div className="">
                    <p className="text-xs">Copyright &copy; {new Date().getFullYear()} OUNCH SDN BHD. ALL RIGHTS RESERVED</p>
                    <p className="text-xs">1.0.0</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterApp;



