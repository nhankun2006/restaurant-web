import SectionTitle from '../components/SectionTitle';
import BookingForm from '../components/BookingForm';

function Booking() {
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

export default Booking;
