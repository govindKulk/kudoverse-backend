import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
    private static instance: PrismaClient;

    private constructor() {}

    public static getInstance(): PrismaClient {
        if (!PrismaSingleton.instance) {
            console.log("init prisma");
            PrismaSingleton.instance = new PrismaClient();
        }
        return PrismaSingleton.instance;
    }
}

export const db = PrismaSingleton.getInstance();
