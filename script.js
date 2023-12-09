const categorySelector = document.getElementById ('category-selector');
     wrapper = document.querySelector(".wrapper"),
    selectBtn = wrapper.querySelector(".select-btn"),
    searchInp = wrapper.querySelector("input"),
    quoteText = document.querySelector("#quote-text"),
    quoteBtn = document.querySelector("button"),
    authorName = document.querySelector("#author"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis,
    options = wrapper.querySelector(".options");

let category = [ "Adventure","Ambition","Balance", "Change", "Confidence","Creativity", "Determination", "Dreams", "Education", "Family","Forgiveness", "Gratitude", "Health", "Hope","Humor","Imagination", "Kindness", "Learning", "Love", "Mindfulness", "Optimism", "Patience", "Perseverance", "Purpose", "Resilience", "Self-Improvement","Simplicity","Teamwork", "Time Management","Vision","Wellness"];

function addcategory( selectedcategory ) {
    options.innerHTML = "";
    category.forEach(country => {
        let isSelected = country ==  selectedcategory  ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addcategory();

function updateName(selectedLi) {
    searchInp.value = "";
    addcategory(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = category.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

//Generating a random Quote

function randomQuote(){
    const category = categorySelector.value;
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch(`https://api.quotable.io/random?category=${category}`).then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);

// Share




















