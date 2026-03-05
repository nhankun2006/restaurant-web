function CategoryFilter({ categories, activeSlug, onSelect }) {
    return (
        <div className="category-filter">
            <button
                className={`category-filter__btn ${!activeSlug ? 'category-filter__btn--active' : ''}`}
                onClick={() => onSelect(null)}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className={`category-filter__btn ${activeSlug === cat.slug ? 'category-filter__btn--active' : ''
                        }`}
                    onClick={() => onSelect(cat.slug)}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
