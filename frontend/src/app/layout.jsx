import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
    title: 'Cay Tung Restaurant — Fine Dining & Private Events',
    description: 'An exquisite fine dining experience with an interactive menu, event booking, and luxury atmosphere.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
