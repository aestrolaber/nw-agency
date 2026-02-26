import { notFound } from "next/navigation";
import { getProspect } from "@/lib/prospects";
import DemoClient from "@/components/DemoClient";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const prospect = getProspect(id);
    if (!prospect) return { title: "Demo Not Found — nw." };
    return {
        title: `${prospect.businessName} + AI — Powered by nw.`,
        description: `See how nw. AI agents work on ${prospect.businessName}'s website. Chat, voice, and lead capture — all running 24/7.`,
    };
}

export default async function DemoPage({ params }: Props) {
    const { id } = await params;
    const prospect = getProspect(id);

    if (!prospect) {
        notFound();
    }

    return <DemoClient prospect={prospect} />;
}
