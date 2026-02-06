try {
    const data = await fetch('/api');
    const response = await data.json();
    renderCards(response);
} catch (err) {
    console.error("Connection error:", err);
}

function renderCards(cardsData) {
    console.log("Attempting to render:", cardsData); // Debug Log 1
    const container = document.querySelector('.cards-container');
    
    if (!container) {
        console.error("Could not find .cards-container in the HTML");
        return;
    }

    let cardsHTML = '';

    cardsData.forEach((card, i) => {
        try {
            // Handle Type (Check if it exists and is an array)
            const typeArr = Array.isArray(card.type) ? card.type : [card.type];
            const recipeType = typeArr.map(t => String(t).trim()).join(' | ');

            // Handle Ingredients (Check if it exists and is an array)
            const ingArr = Array.isArray(card.ingredients) ? card.ingredients : [];
            const ingredientsList = ingArr.map(ing => `<li>${String(ing).trim()}</li>`).join('');

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
        } catch (loopErr) {
            console.error(`Error processing card at index ${i}:`, loopErr);
        }
    });

    console.log("HTML generated successfully"); // Debug Log 2
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