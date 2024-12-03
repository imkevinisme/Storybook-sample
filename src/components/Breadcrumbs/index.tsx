import React, { FC } from "react";
import Link from "next/link";


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export type Crumb = {
    title: string;
    link: string;
}

interface Props {
    items: Crumb[];
}

const Breadcrumbs:FC<Props> = ({ items }) => {

    const popped = items.pop();

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>

                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={item.link}>{item.title}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </React.Fragment>
                ))}

                {
                    popped && (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{ popped.title }</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )
                }

            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;


