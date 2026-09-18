import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

export const metadata = {
    title: 'Nhà Hàng Cây Tùng — Ẩm Thực Cao Cấp & Tiệc Lịch Sự',
    description: 'Trải nghiệm ẩm thực cao cấp với thực đơn phong phú, đặt bàn trực tuyến và không gian sang trọng.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Providers>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
