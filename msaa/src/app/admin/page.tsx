import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { createReflection } from '@/app/actions/reflectionActions';

export default async function AdminDashboard() {
    const session = await auth();

    // Role-based access control enforcement
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect('/');
    }

    return (
        <div className="flex flex-col items-center w-full bg-[#f6fafd] min-h-screen p-8 text-[#171c1e]">
            <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-sm border border-[#eaeef1]">
                <div className="flex justify-between items-center mb-8 border-b border-[#eaeef1] pb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#23395d]">Admin Dashboard</h1>
                        <p className="text-[#6e797e] mt-1">Manage active Reflections.</p>
                    </div>
                    <div className="text-sm text-[#3e484d] bg-[#f0f4f7] px-4 py-2 rounded-md">
                        Logged in as: <span className="font-semibold">{session?.user?.email}</span>
                    </div>
                </div>

                <form action={createReflection} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="type" className="text-sm font-semibold text-[#23395d]">Reflection Type</label>
                        <select 
                            name="type" 
                            id="type" 
                            required
                            className="p-3 border border-[#bdc8ce] rounded-md focus:outline-none focus:border-[#0891B2] focus:ring-1 focus:ring-[#0891B2] bg-white text-[#171c1e]"
                        >
                            <option value="HADITH">Hadith</option>
                            <option value="AYA">Quranic Aya</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="contentArabic" className="text-sm font-semibold text-[#23395d]">Arabic Content</label>
                        <textarea 
                            name="contentArabic" 
                            id="contentArabic" 
                            rows={3} 
                            required
                            dir="rtl"
                            className="p-3 border border-[#bdc8ce] rounded-md focus:outline-none focus:border-[#0891B2] text-[#171c1e] text-right text-lg font-serif"
                            placeholder="النص العربي هنا..."
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="contentEnglish" className="text-sm font-semibold text-[#23395d]">English Translation</label>
                        <textarea 
                            name="contentEnglish" 
                            id="contentEnglish" 
                            rows={3} 
                            required
                            className="p-3 border border-[#bdc8ce] rounded-md focus:outline-none focus:border-[#0891B2] text-[#171c1e]"
                            placeholder="English translation here..."
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="source" className="text-sm font-semibold text-[#23395d]">Source</label>
                            <input 
                                type="text" 
                                name="source" 
                                id="source" 
                                required
                                className="p-3 border border-[#bdc8ce] rounded-md focus:outline-none focus:border-[#0891B2] focus:ring-1 focus:ring-[#0891B2] text-[#171c1e]"
                                placeholder="e.g., Al-Kafi, Vol 2"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="date" className="text-sm font-semibold text-[#23395d]">Display Date</label>
                            <input 
                                type="date" 
                                name="date" 
                                id="date" 
                                required
                                className="p-3 border border-[#bdc8ce] rounded-md focus:outline-none focus:border-[#0891B2] focus:ring-1 focus:ring-[#0891B2] text-[#171c1e]"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="mt-4 px-6 py-3 bg-[#0891B2] text-white font-semibold rounded-md hover:bg-[#067a96] transition-colors"
                    >
                        Publish Reflection
                    </button>
                </form>
            </div>
        </div>
    );
}