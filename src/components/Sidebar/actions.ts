"use server";

import { cookies } from 'next/headers';

export const SetSidebarState = async (isOpen: 'true' | 'false') => {
    cookies().set('sidebarOpen', isOpen);
}

export const GetSidebarState = async () => {
    return cookies().get('sidebarOpen');
}
