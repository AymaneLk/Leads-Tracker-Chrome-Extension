// ARRAY FOR STORING LEADS 
let myLeads = new Array();

// GETTING ELEMENTS FROM THE DOM
const inputEl = document.getElementById("input-el");
const btnEl = document.getElementById("btn-el");
const h1El = document.getElementById("h1-el");
const ulEl = document.getElementById("ul-el");
const tabEl = document.getElementById("tab-el");
const dltEl = document.getElementById("dlt-el");

/******************************************* EVENT LISTNERS *********************************************/
btnEl.addEventListener("click", function() {
    if (inputEl.value !== "")
    {
        // STORING THE LEAD IN THE ARRAY    
        myLeads.push(inputEl.value)
        inputEl.value = "";
        // STORING THE LEAD IN LOCAL STORAGE conso
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        // FETCHING LOCAL STORAGE IN ORDER TO PRINT LEADS IN THE DOM
        render(myLeads);
    }
})

tabEl.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // PUSHING TAB'S URL INTO myLeads ARRAY
        myLeads.push(tabs[0].url);
        // STORING THE URL INTO LOCAL STORAGE
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        // PRINTING THE URL INTO THE DOM
        render(myLeads);
    })
})

dltEl.addEventListener("dblclick", function() {
    // CLEARING LOCAL STORAGE
    localStorage.clear();
    // CLEARING myLeads ARRAY
    myLeads = [];
    // DELETING FROM DOM
    render(myLeads);
})

/******************************************** FUNCTIONS ************************************************/
// FETCHING LOCAL STORAGE IN ORDER TO GET STORED LEADS
function fetchLocalStorage() {
    // CONVERTING LOCAL STORAGE STRING THAT STORE OUR LEADS AND PUSH IT IN myLeads ARRAY
    const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
    // CHECKING IF WE GOT SOMETHING FROM LOCAL STORAGE
    if (leadsFromLocalStorage)
    {
        myLeads = leadsFromLocalStorage;
        render(myLeads);
    }
}

// PRINTING LEADS IN THE DOM
function render(leads) {
    let ulElItems = "";

    h1El.textContent = "Your leads:";
    for (let i = 0; i < leads.length; i++) {
        ulElItems += 
        `
            <li>
                <a href="#" target="_blank">${leads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = ulElItems;

    // DELETING "YOUR LEADS:" TITLE IF THE ARRAY IS EMPTY
    if(!leads.length)
        h1El.textContent = "";
}


fetchLocalStorage();