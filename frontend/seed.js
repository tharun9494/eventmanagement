import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs8zIPCX_3itbGz6LVJCrkall_khUTrnc",
  authDomain: "ankit-eventmanage.firebaseapp.com",
  projectId: "ankit-eventmanage",
  storageBucket: "ankit-eventmanage.firebasestorage.app",
  messagingSenderId: "390354300435",
  appId: "1:390354300435:web:f261ce54e1f0b9fe5dd9e6",
  measurementId: "G-E6C7RQMZQR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const upcomingEvents = [
    {
        id: "evt-001",
        title: "Aurora Tech Summit 2027",
        category: "Tech Conference",
        date: "2027-03-14T18:00:00",
        dateLabel: "Mar 14, 2027",
        time: "6:00 PM",
        location: "Lisbon, Portugal",
        price: "$249",
        image: "https://images.unsplash.com/photo-1771911650360-31fdb3344c74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85",
        featured: true,
        tag: "Featured",
        sold: 72,
        capacity: 1200,
        speakers: 48,
    },
    {
        id: "evt-002",
        title: "Neon Pulse Music Festival",
        category: "Live Music",
        date: "2026-08-22T20:00:00",
        dateLabel: "Aug 22, 2026",
        time: "8:00 PM",
        location: "Berlin, Germany",
        price: "$89",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBkYXl0aW1lfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85",
        tag: "Hot",
        sold: 58,
        capacity: 8500,
        speakers: 24,
    },
    {
        id: "evt-003",
        title: "Frontier AI Conference",
        category: "AI / ML",
        date: "2026-09-09T09:00:00",
        dateLabel: "Sep 09, 2026",
        time: "9:00 AM",
        location: "San Francisco, USA",
        price: "$399",
        image: "https://images.unsplash.com/photo-1762176263996-a0713a49ee4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85",
        tag: "New",
        sold: 44,
        capacity: 2000,
        speakers: 36,
    },
    {
        id: "evt-004",
        title: "Designers' Crystal Night",
        category: "Design Gala",
        date: "2026-10-18T19:30:00",
        dateLabel: "Oct 18, 2026",
        time: "7:30 PM",
        location: "Tokyo, Japan",
        price: "$179",
        image: "https://images.unsplash.com/photo-1683368727353-a9a72b38d567?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwyfHxjb25jZXJ0JTIwY3Jvd2QlMjBkYXl0aW1lfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85",
        tag: "VIP",
        sold: 30,
        capacity: 900,
        speakers: 14,
    },
];

async function seed() {
    console.log("Seeding events...");
    for (const evt of upcomingEvents) {
        await setDoc(doc(db, "events", evt.id), evt);
        console.log("Added", evt.id);
    }
    console.log("Done.");
    process.exit();
}

seed();
