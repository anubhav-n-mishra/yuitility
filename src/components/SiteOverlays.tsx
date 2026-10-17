"use client";
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import dynamic from 'next/dynamic';
import CookieBanner from './CookieBanner';
const AiChatbot=dynamic(()=>import('./AiChatbot'),{ssr:false});
export default function SiteOverlays(){const path=usePathname();const [notice,setNotice]=useState(true);useEffect(()=>{try{setNotice(localStorage.getItem('storage_notice_seen')!=='1');}catch{setNotice(true);}},[]);if(path.startsWith('/embed/'))return null;return notice?<CookieBanner onDismiss={()=>{try{localStorage.setItem('storage_notice_seen','1');}catch{}setNotice(false);}}/>:<AiChatbot/>;}
