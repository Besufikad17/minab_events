import { Event } from "~/types/event";

export const events: Event[] = [
    {
        id: 1,
        userId: 1,
        title: "Agrofood Ethiopia 2024",
        description: "Agrofood Ethiopia is Ethiopia's leading trade show & conference on agriculture, food & beverage technology, food ingredients and food. Products like agricultural machines, farming tractors, harvesting equipment, analytical equipment, poultry equipment, milling and mixing installations/equipment, fish farming equipment, irrigation systems as well as food ingredients and finished food will be featured.",
        category: "Conference",
        image: "https://img.10times.com/event/wa769d3f4ba29c6bcb53fade82471e1e/1559707450363/1559649760615.jpg?imgeng=/w_225/h_150/m_letterbox_000000_30/cmpr_60",
        location: {
            city: "Addis Ababa",
            venue: "Millennium Hall"
        },
        enteranceFee: 0,
        tags: ["#Agriculture", "#Agrofood"],
        startDate: new Date(2024, 5, 16),
        endDate: new Date(2024, 5, 18)
    },
    {
        id: 2,
        userId: 1,
        title: "Africa Security Symposium 2024",
        description: "The Africa Security Symposium (ASEC2024) is a prestigious event attended by government officials, security experts, and private sector suppliers. With panel discussions, networking opportunities, and matchmaking meetings, attendees collaborate to address Africa's security challenges and explore technological solutions. Join us for this vital event.",
        category: "Conference",
        image: "https://img.10times.com/event/wa769d3f4ba29c6bcb53fade82471e1e/1559707450363/1559649760615.jpg?imgeng=/w_225/h_150/m_letterbox_000000_30/cmpr_60",
        location: {
            city: "Addis Ababa",
            venue: "Ethiopian Skylight Hotel"
        },
        tags: ["#Cyber", "#Security"],
        enteranceFee: 100,
        startDate: new Date(2024, 5, 22),
        endDate: new Date(2024, 5, 23)
    },
    {
        id: 3,
        userId: 1,
        title: "ICDE Leadership Summit 2024",
        description: "Globethics hosts the ICDE Leadership Summit, a global conference addressing challenges and opportunities in education. ICDE promotes accessible, quality education through open and distance learning, impacting millions of students. The Summit offers networking and development opportunities for educational leaders and innovators worldwide.",
        category: "Conference",
        image: "https://img.10times.com/event/wa769d3f4ba29c6bcb53fade82471e1e/1559707450363/1559649760615.jpg?imgeng=/w_225/h_150/m_letterbox_000000_30/cmpr_60",
        location: {
            city: "Addis Ababa",
            venue: "Ethiopian Skylight Hotel"
        },
        tags: ["#Cyber", "#Security"],
        enteranceFee: 100,
        startDate: new Date(2024, 4, 22),
        endDate: new Date(2024, 5, 23)
    }
];
