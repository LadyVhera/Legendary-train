// Add your JavaScript code in script.js

const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const categorySelector = document.getElementById('category-selector');
const searchCategoryBtn = document.getElementById('search-category-btn');
const speakBtn = document.getElementById('speak-btn');

let currentQuote = {};

// Function to fetch a random quote from Quotable API
async function fetchRandomQuote() {
    const category = categorySelector.value;
    const apiUrl = `https://api.quotable.io/random?category=${category}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            currentQuote = data;
            updateQuote();
        } else {
            console.error('Error fetching quote:', data);
        }
    } catch (error) {
        console.error('Error fetching quote:', error.message);
    }
}

// Function to update the displayed quote
function updateQuote() {
    quoteText.innerText = currentQuote.content;
    authorText.innerText = `— ${currentQuote.author}`;
}

// Event listener for the "New Quote" button
newQuoteBtn.addEventListener('click', fetchRandomQuote);

// Event listener for the "Search by Category" button
searchCategoryBtn.addEventListener('click', fetchRandomQuote);

// Event listener for the "Speak" button
speakBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`${currentQuote.content} by ${currentQuote.author}`);
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
});

// Initial quote generation
fetchRandomQuote();

