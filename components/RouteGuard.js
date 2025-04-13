// components/RouteGuard.js
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { useEffect, useState } from 'react';
import {getHistory, getFavourites} from "@/lib/userData";
import {readToken, isAuthenticated} from '@/lib/authenticate';

const PUBLIC_PATHS = ['/', '/login', '/register'];

export default function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [, setFavourites] = useAtom(favouritesAtom);
    const [, setSearchHistory] = useAtom(searchHistoryAtom);
  
   
    const updateAtoms = async () => {
        setFavourites(await getFavourites());
    setSearchHistory(await getHistory());
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = readToken();
        if (!isAuthenticated && !PUBLIC_PATHS.includes(router.pathname)) {
                router.push('/login'); 
            } else {
                updateAtoms();
            }
        };

        checkAuth();
    }, [router.pathname, router, updateAtoms]);

    return <>{children}</>;
}
