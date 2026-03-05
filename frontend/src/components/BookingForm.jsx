import { useState } from 'react';
import { createBooking } from '../api/client';
import { FiCheck } from 'react-icons/fi';

function BookingForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        event_type: 'dinner',
        date: '',
        time: '19:00',
        guests: 2,
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createBooking(formData);
            setSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again or call us directly.');
            console.error('Booking error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="booking-success animate-fade-in-up">
                <div className="booking-success__icon">
                    <FiCheck />
                </div>
                <h3 className="booking-success__title">Reservation Confirmed!</h3>
                <p className="booking-success__message">
                    Thank you, <strong>{formData.name}</strong>! We've received your reservation
                    for <strong>{formData.guests} guests</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
                    <br /><br />
                    We'll send a confirmation to <strong>{formData.email}</strong> shortly.
                    We look forward to welcoming you at Cay Tung!
                </p>
                <button
                    className="btn btn-gold"
                    style={{ marginTop: '2rem' }}
                    onClick={() => {
                        setSubmitted(false);
                        setFormData({
                            name: '', email: '', phone: '', event_type: 'dinner',
                            date: '', time: '19:00', guests: 2, message: '',
                        });
                    }}
                >
                    Make Another Reservation
                </button>
            </div>
        );
    }

    return (
        <form className="booking-form animate-fade-in-up" onSubmit={handleSubmit}>
            <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                textAlign: 'center',
                marginBottom: 'var(--space-2xl)',
                color: 'var(--color-dark)',
            }}>
                Make a Reservation
            </h3>

            {error && (
                <div style={{
                    background: '#FEE',
                    border: '1px solid var(--color-error)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-md)',
                    marginBottom: 'var(--space-lg)',
                    color: 'var(--color-error)',
                    textAlign: 'center',
                }}>
                    {error}
                </div>
            )}

            <div className="booking-form__grid">
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input
                        id="name" name="name" type="text" className="form-input"
                        placeholder="John Doe" value={formData.name}
                        onChange={handleChange} required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        id="email" name="email" type="email" className="form-input"
                        placeholder="john@example.com" value={formData.email}
                        onChange={handleChange} required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                        id="phone" name="phone" type="tel" className="form-input"
                        placeholder="(310) 555-1234" value={formData.phone}
                        onChange={handleChange} required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="event_type">Event Type</label>
                    <select
                        id="event_type" name="event_type" className="form-select"
                        value={formData.event_type} onChange={handleChange}
                    >
                        <option value="dinner">Dinner Reservation</option>
                        <option value="lunch">Lunch Reservation</option>
                        <option value="birthday-party">Birthday Party</option>
                        <option value="corporate-event">Corporate Event</option>
                        <option value="wedding-reception">Wedding Reception</option>
                        <option value="private-dining">Private Dining</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="date">Date</label>
                    <input
                        id="date" name="date" type="date" className="form-input"
                        value={formData.date} onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]} required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="time">Preferred Time</label>
                    <select
                        id="time" name="time" className="form-select"
                        value={formData.time} onChange={handleChange}
                    >
                        <option value="11:30">11:30 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="12:30">12:30 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="guests">Number of Guests</label>
                    <input
                        id="guests" name="guests" type="number" className="form-input"
                        min="1" max="200" value={formData.guests}
                        onChange={handleChange} required
                    />
                </div>

                <div className="form-group booking-form__full">
                    <label className="form-label" htmlFor="message">Special Requests</label>
                    <textarea
                        id="message" name="message" className="form-textarea"
                        placeholder="Any dietary restrictions, seating preferences, or special occasion details..."
                        value={formData.message} onChange={handleChange}
                    />
                </div>

                <div className="booking-form__full" style={{ textAlign: 'center' }}>
                    <button
                        type="submit"
                        className="btn btn-gold"
                        disabled={loading}
                        style={{ minWidth: '250px' }}
                    >
                        {loading ? 'Submitting...' : 'Confirm Reservation'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default BookingForm;
