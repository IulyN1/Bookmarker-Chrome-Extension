const inputBtn = document.getElementById("inp-btn")
const deleteBtn = document.getElementById("del-btn")
const tabBtn = document.getElementById("tab-btn")
const inputEl = document.getElementById("inp")
const ulEl = document.getElementById("list")
let myLeads = []
let oldLeads = []

const leadsFromLocal = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocal){
    myLeads = leadsFromLocal
    renderLeads(myLeads)
}

function renderLeads(leads){
    let listItems = ""
    for(let i = 0;i < leads.length;i++){
        /*
        const li = document.createElement("li")
        li.textContent = myLeads[i]
        ulEl.append(li)
        */
        //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads(myLeads)
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})
