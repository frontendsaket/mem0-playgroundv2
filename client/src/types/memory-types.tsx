/* eslint-disable @typescript-eslint/no-explicit-any */

interface MemoryItemInterface {
    categories: string[];
    created_at: string;
    customCategories: string | null;
    hash: string;
    id: string;
    memory: string;
    metadata: any | null;
    updated_at: string;
    userId: string;
}

export type {MemoryItemInterface};