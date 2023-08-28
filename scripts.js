const apiKey = process.env.NEWS_API_KEY;
const proxyUrl = 'https://adamsabry1233.github.io/newsapp/'; // Replace with your proxy server URL
let currentUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', handleSearch);
});

async function fetchNews() {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('There was an error!', error);
    }
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput').value; 
    if (searchInput.trim() !== '') {
        const searchUrl = `https://newsapi.org/v2/top-headlines?country=us&q=${encodeURIComponent(searchInput)}&apiKey=${apiKey}`;
        fetchNews(searchUrl);
    }
}

function displayNews(articles) {
    const newsDiv = document.querySelector('#news');
    
    for (const article of articles) {
        const articleDiv = document.createElement('article'); // Use <article> for semantic markup
        
        const title = document.createElement('h4');
        title.textContent = article.title;
        
        
        const description = document.createElement('p');
        description.textContent = article.description;
        
        
        const source = document.createElement('p');
        source.textContent = `Source: ${article.source.name}`;
        

        const image = document.createElement('img');
        image.src = article.urlToImage;
        
        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = "Read More";


        articleDiv.appendChild(title);
        articleDiv.appendChild(source);
        articleDiv.appendChild(image);
        newsDiv.appendChild(articleDiv);
        articleDiv.appendChild(description);
        articleDiv.appendChild(link);
    }
}
