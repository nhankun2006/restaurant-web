import SectionTitle from '../../components/SectionTitle';
import BookingForm from '../../components/BookingForm';

export const metadata = {
    title: 'Reservations — Cay Tung Restaurant',
    description: 'Book your table or private event at Cay Tung Restaurant.',
};

export default function BookingPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Reservations</h1>
                    <div className="page-header__divider"></div>
                    <p>Secure your table at Cay Tung for an unforgettable dining experience.</p>
                </div>
            </div>

            <section className="section booking-section">
                <div className="container">
                    <SectionTitle
                        label="Book Your Experience"
                        title="Reserve Your Table"
                        description="Fill in the details below and we'll confirm your reservation within 24 hours."
                    />
                    <BookingForm />
                </div>
            </section>
        </>
    );
}
