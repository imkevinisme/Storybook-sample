import React, { FC, ReactNode } from "react";
import { HeadingOne } from "@/components/Typography";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageHeadingProps {
    headingText: string;
    breadcrumbs?: Array<{
        title: string;
        link: string;
    }>;
    children?: ReactNode;
}

const PageHeading: FC<PageHeadingProps> = ({ headingText, breadcrumbs, children }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <HeadingOne text={headingText} />
                {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            </div>
            {children && (
                <div className="flex items-center">
                    {children}
                </div>
            )}
        </div>
    );
};

export default PageHeading;

