import { Inter, Noto_Serif_JP, Dancing_Script } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin']
});

export const noto_serif_jp = Noto_Serif_JP({
    subsets: ['latin'],
    weight: ['400', '700']
});

export const redressed = Dancing_Script({
    subsets: ['latin'],
    weight: ['700']
});
