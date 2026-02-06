const foodName = document.getElementById('food-name')
const foodType = document.getElementById('food-type')
const foodIngredients = document.getElementById('food-ingredients')
const addBtn = document.getElementById('add-btn')
const clearBtn = document.getElementById('clear-btn')
const foodIngredientsList = document.getElementById('food-ingredients-list')
const submitBtn = document.getElementById('submit-btn');

let ingredientsArr = []
let idCount = ingredientsArr.length

addBtn.addEventListener('click', function () {
    if (foodIngredients.value) {
        ingredientsArr.push(foodIngredients.value)
        addIngredients(foodIngredients.value)
        foodIngredients.value = ''
        console.log(ingredientsArr)
    }
})

foodIngredients.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (foodIngredients.value) {
            ingredientsArr.push(foodIngredients.value)
            addIngredients(foodIngredients.value)
            foodIngredients.value = ''
            console.log(ingredientsArr)
        }
    }
})

clearBtn.addEventListener('click', function () {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked')
    console.log(checked)
    checked.forEach(checkbox => {
        const checkedId = checkbox.id
        const checkedItem = document.querySelector(`label[for="${checkedId}"]`)
        console.log(`text to remove is ${checkedItem.textContent}`)
        ingredientsArr.splice(ingredientsArr.indexOf(checkedItem.textContent), 1)
        console.log(ingredientsArr)
        checkbox.closest('div').remove()
    })
})

function addIngredients (text) {
    console.log(text)
    uniqueID = 'foodIngredient' + idCount
    idCount+=1

    const ingredientItemContainer = document.createElement('div')
    ingredientItemContainer.className = 'item-container'

    const ingredientItemCheck = document.createElement('input')
    ingredientItemCheck.type = 'checkbox'
    ingredientItemCheck.id = uniqueID

    const ingredientItemLabel = document.createElement('label')
    ingredientItemLabel.htmlFor = uniqueID
    ingredientItemLabel.appendChild(document.createTextNode(text))

    ingredientItemContainer.appendChild(ingredientItemCheck)
    ingredientItemContainer.appendChild(ingredientItemLabel)
    foodIngredientsList.appendChild(ingredientItemContainer)
}

submitBtn.addEventListener('click', async function() {
    // 1. Select all checkboxes with the name "food-type" that are currently :checked
    const checkedTypes = document.querySelectorAll('input[name="food-type"]:checked');
    
    // 2. Convert the NodeList into an Array of just the values
    const selectedTypesArr = Array.from(checkedTypes).map(checkbox => checkbox.value);

    // 3. Create your final object to save
    const newRecipe = {
        name: foodName.value,
        type: selectedTypesArr, // This is now an array, e.g., ["pork", "vegetable"]
        ingredients: ingredientsArr
    };

    console.log("Ready to save:", newRecipe);

    try {
        const response = await fetch("/api", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        })

        if (response.ok) {
            console.log('Recipe uploaded to server...')
            foodName.value = ''
            checkedTypes.forEach(checkbox => {
                checkbox.checked = false
            })
            foodIngredientsList.innerHTML = ''
        } else {
            console.error("Server Error: ", response.statusText)
        }
    } catch (err) {
        console.error("Error: ", err)
    }
    
    // Optional: Send to your API
    // saveRecipe(newRecipe);
})