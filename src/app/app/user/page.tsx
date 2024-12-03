import React from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    {
        title: "Samples",
        link: "/",
    },
    {
        title: `SamplesTwo`,
        link: "/SamplesTwo",
    },
];

function user() {
    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <Button />
        </>
    )
}

export default user