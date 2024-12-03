
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

const Address: FC<Props> = ({ address, address2, city, state, zip, country }) => {
    return (
        <address className="not-italic">
            <div>{address}</div>
            <div>{address2}</div>
            <div>{city}, {state} {zip}</div>
            <div>{country}</div>
        </address>
    );
}

export default Address;
