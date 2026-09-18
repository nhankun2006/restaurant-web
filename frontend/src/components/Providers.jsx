'use client';
import { BanquetCartProvider } from '../context/BanquetCartContext';

export default function Providers({ children }) {
    return <BanquetCartProvider>{children}</BanquetCartProvider>;
}
