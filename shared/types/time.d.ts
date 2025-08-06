export type Time = {
    time: number;
    id: number;
    status: 'solved' | 'dnf' | 'plusTwo';
    sessionId: string;
    createdAt: string;
    updatedAt: string;
};
