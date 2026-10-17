import type { Metadata } from 'next';
import {notFound} from 'next/navigation';
import {getPreset, getAllToolPresets} from '@/src/lib/toolPresets';
import {getToolById} from '@/src/lib/toolRegistry';
import EmbedClient from '../EmbedClient';
type Props={params:Promise<{slug:string;preset:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return getAllToolPresets().map(p=>({slug:p.toolId,preset:p.presetSlug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const p=await params;const preset=getPreset(p.slug,p.preset);if(!preset)notFound();return {title:`${preset.h1} widget`,alternates:{canonical:`/tools/${p.slug}/${p.preset}`},robots:{index:false,follow:true}};}
export default async function Page({params}:Props){const p=await params;const tool=getToolById(p.slug);const preset=getPreset(p.slug,p.preset);if(!tool||!preset)notFound();return <EmbedClient tool={tool} preset={preset}/>;}
