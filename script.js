async function getRandomQuote() {
    try {
        const category = document.getElementById("categorySelect").value;
        const response = await fetch(`https://dummyjson.com/quotes/random?category=${category}`);
        const data = await response.json();
        const quote = data.quote;
        const author = data.author;
        document.getElementById("quote").textContent = quote;
        document.getElementById("author").textContent = `- ${author}`;
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
}

function saveToFavorites() {
    const quote = document.getElementById("quote").textContent;
    const author = document.getElementById("author").textContent;
    const favoriteQuotes = JSON.parse(localStorage.getItem("favorites")) || [];

    const newQuote = `${quote} ${author}`;

    if (!favoriteQuotes.includes(newQuote)) {
        favoriteQuotes.push(newQuote);
        localStorage.setItem("favorites", JSON.stringify(favoriteQuotes));
        displayFavorites();
    } else {
        alert("This quote is already saved!");
    }
}

function displayFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    const favoriteQuotes = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesList.innerHTML = "";

    favoriteQuotes.forEach((quote, index) => {
        const li = document.createElement("li");
        li.textContent = quote;

        const closeIcon = document.createElement("span");
        closeIcon.classList.add("close-icon");
        closeIcon.textContent = "×";  // Close icon
        closeIcon.onclick = () => removeQuote(index); // Remove quote on click
        li.appendChild(closeIcon);

        favoritesList.appendChild(li);
    });
}

function removeQuote(index) {
    const favoriteQuotes = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesList = document.getElementById("favoritesList");

    // Apply removal effect (fade out and shrink)
    const li = favoritesList.children[index];
    li.classList.add("removing");

    // Remove quote after the transition ends
    setTimeout(() => {
        favoriteQuotes.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favoriteQuotes));
        displayFavorites();
        alert("Quote removed successfully!");
    }, 300); // Matches the duration of the transition
}

// Load a quote on page load
getRandomQuote();
displayFavorites();
