const companies = [
    "Tata Consultancy Services",
    "Tata Electronics",
    "Hindustan Aeronautics Limited",
    "Bharat Electronics Limited",
    "Dixon Technologies",
    "Kaynes Technology",
    "CG Power",
    "Schneider Electric"
];

const searchInput = document.querySelector('.search-box');
const companyList = document.querySelector('.company-list');

if(searchInput && companyList){
    searchInput.addEventListener('input', (event)=>{
        let userSearch = event.target.value.toLowerCase().trim();
        let searchResult = companies.filter((company)=>{
            return company.toLowerCase().includes(userSearch);
        })
        
        renderList(searchResult);
    })
}

function renderList(itemsToDisplay) {
    // CRITICAL FIX: Wipe the board clean before rendering new items!
    companyList.innerHTML = '';

    // Handle the "No Results" scenario
    if (itemsToDisplay.length === 0) {
        const noResultsLi = document.createElement('li');
        noResultsLi.textContent = "No results found";
        noResultsLi.classList.add('no-results');
        companyList.appendChild(noResultsLi);
        return; // Stop the function here
    }

    // Handle the standard rendering
    itemsToDisplay.forEach((company) => {
        const listElement = document.createElement('li');
        listElement.textContent = company;
        listElement.classList.add('company-item');
        companyList.appendChild(listElement);
    });
}

renderList(companies);