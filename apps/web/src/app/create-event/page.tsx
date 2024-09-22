// src/app/create-event/page.tsx
import CreateEventPage from "@/components/createEvent"; // Adjust the path as necessary
import Wrapper from "@/components/wrapper";

const CreateConcertPage = () => {
    return (
        <Wrapper>
            <div>
                <h1 className="justify-center text-center mb-7">Create a New Event</h1>
                <CreateEventPage />
            </div>
        </Wrapper>
    );
};

export default CreateConcertPage;
