// Admin layout — intentionally excludes Navbar and Footer
export const metadata = {
    title: 'Admin — Quản Trị Nhà Hàng Cây Tùng',
    description: 'Trang quản trị nội bộ',
    robots: 'noindex, nofollow',   // Do NOT index this page
};

export default function AdminLayout({ children }) {
    return <>{children}</>;
}
