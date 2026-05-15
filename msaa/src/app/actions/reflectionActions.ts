'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export async function createReflection(formData: FormData) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error('Unauthorized access.');
    }

    const type = formData.get('type') as 'HADITH' | 'AYA';
    const contentArabic = formData.get('contentArabic') as string;
    const contentEnglish = formData.get('contentEnglish') as string;
    const source = formData.get('source') as string;
    const dateInput = formData.get('date') as string;

    if (!type || !contentArabic || !contentEnglish || !source || !dateInput) {
        throw new Error('All fields are required.');
    }

    const displayDate = new Date(dateInput);

    await prisma.reflection.create({
        data: {
            type,
            contentArabic,
            contentEnglish,
            source,
            date: displayDate,
        },
    });

    revalidatePath('/');
    revalidatePath('/admin');
}