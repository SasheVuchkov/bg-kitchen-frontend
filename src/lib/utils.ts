import { Request, Response} from './types';
import {ZodError} from 'zod';

export const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("bg-BG");
}

export const getCurrentDate = () => new Date().toISOString();

export const getFieldErrorMessage = (path: string[], zodError: ZodError) => {
    console.log("zod issues", zodError?.issues?.find(e => e.path.length === path.length && e.path.every(v => path.includes(v))));
    return zodError?.issues?.find(e => e.path.length === path.length && e.path.every(v => path.includes(v)))?.message;
}

export const fromCents = (price: number) => price / 100;
export const toCents = (price: number) => Math.trunc(price * 100);
