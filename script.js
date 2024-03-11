document.addEventListener('DOMContentLoaded', function () {
    const get_meal_btn = document.getElementById("get_meal")


    get_meal_btn.addEventListener('click', () => {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(res => {
                createMeal(res.meals[0]);
            })
            .catch(e => {
                console.warn(e);
            });
    })

    const createMeal = meal => {
        const mealContainer = document.getElementById("meal")
        const mealImage = document.getElementById("meal_image");
        const mealName = document.getElementById("meal_name");
        const mealDescription = document.getElementById("meal_description");
        const mealRecipe = document.getElementById("meal_recipe");
        const mealVideo = document.getElementById("meal_video");


        mealImage.setAttribute('src', meal.strMealThumb)
        mealName.textContent = meal.strMeal
        mealDescription.textContent = meal.strInstructions

        while (mealRecipe.firstChild) {
            mealRecipe.removeChild(mealRecipe.lastChild);
        }
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
                console.log(ingredientItem)
                mealRecipe.appendChild(ingredientItem);
            } else {
                break;
            }
        }

        mealVideo.setAttribute('src', `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`)
        mealContainer.classList.remove("hidden")
    }

})