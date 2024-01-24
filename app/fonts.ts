import { Inter, Noto_Serif_JP, Redressed } from 'next/font/google'

export const inter = Inter({ 
    subsets: ['latin'] 
});

export const noto_serif_jp = Noto_Serif_JP({
    subsets: ['latin'], 
    weight: ['400', '700']
});

export const redressed = Redressed({
    subsets: ['latin'],
    weight: ['400']
})