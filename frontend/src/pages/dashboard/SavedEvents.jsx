import EventCard from "./EventCard";

export default function SavedEvents({ events }) {
    if (!events || events.length === 0) {
        return <div className="text-center py-20 text-[#475569] font-medium">You haven't saved any events yet.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
                <EventCard key={e.id} event={e} />
            ))}
        </div>
    );
}
