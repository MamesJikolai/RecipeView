try {
    const data = await fetch('/api');
    const response = await data.json();
    renderCards(response);
} catch (err) {
    console.error("Connection error:", err);
}

function renderCards(cardsData) {
    const container = document.querySelector('.cards-container');
    
    // Ensure the container exists before trying to inject HTML
    if (!container) return;

    let cardsHTML = '';

    cardsData.forEach((card, i) => {
        // Split string into array, trim whitespace, and wrap in <li>
        const recipeType = card.type
            .map(item => item.trim())
            .join(' | ');

        const ingredientsList = card.ingredients
            .map(item => `<li>${item.trim()}</li>`)
            .join('');

        cardsHTML += `
        <article class="recipe-card" aria-labelledby="food-name-${i}">
            <p class="recipe-type">${recipeType}</p>
            <h3 id="food-name-${i}">${card.name}</h3>
            <div class="ingredients-text-wrapper">
                <ul class="ingredients-list">
                    ${ingredientsList}
                </ul>
            </div>
            <button class="read-more-btn" aria-expanded="false">Read in full</button>
        </article>
        `;
    });

    container.innerHTML = cardsHTML;
}

// Delegation for the click event
document.querySelector(".cards-container").addEventListener("click", (e) => {
    if (!e.target.classList.contains("read-more-btn")) return;

    const button = e.target;
    const recipeCard = button.closest('.recipe-card');
    const isExpanded = recipeCard.classList.toggle("expanded");

    button.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    button.textContent = isExpanded ? "Show less" : "Read in full";
});