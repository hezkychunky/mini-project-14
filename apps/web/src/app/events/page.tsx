import FilterEvents from "@/components/filterEvents";
import Wrapper from "@/components/wrapper";
import Link from "next/link";

export default function Events() {
    return (
        <Wrapper>
            <div>
                <Link href={'/konsers'}>Go Back</Link>
                <h1>Event Search by City</h1>
                <FilterEvents />
            </div>
        </Wrapper>
    )
}