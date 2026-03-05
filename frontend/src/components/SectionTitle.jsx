function SectionTitle({ label, title, description, light = false }) {
    return (
        <div className="section-title">
            {label && <p className="section-title__label">{label}</p>}
            <div className="section-title__divider"></div>
            <h2 className="section-title__heading">{title}</h2>
            {description && <p className="section-title__desc">{description}</p>}
        </div>
    );
}

export default SectionTitle;
