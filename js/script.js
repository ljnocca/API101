console.log($)
var searchURL = 'https://congress.api.sunlightfoundation.com/bills/search?callback=?&apikey=123&query='
var baseURL = 'https://congress.api.sunlightfoundation.com/bills?callback=?&apikey=123'

var makeBillHTML = function(singleBillObj) { // takes in a single object of the array and converts the object into html
    var getHTML = ''
    getHTML += '<div class="bill">'
    getHTML +=  '<h2 class="title">' + singleBillObj.official_title + '</h2>'
    getHTML +=  '<p class="chamber"> Chamber: ' + singleBillObj.chamber + '</p>'
    getHTML +=  '<p class="sponsor"> Sponsor: ' + singleBillObj.sponsor.first_name + ' ' + singleBillObj.sponsor.last_name + '</p>'
    getHTML +=  '<p class="status"> Status: ' + (singleBillObj.history.active ? 'active' : 'dead') + '</p>'
    getHTML +=  '<p class="introDate"> Introduced on: ' + singleBillObj.introduced_on + '</p>'
    getHTML += '</div>'

    return getHTML

}

function handleBillsResponse(billsObj) { // takes object from apiresponse and processes data each iteration
    var allBillsHTML = ''
    var containerNode = document.querySelector('.container')

    for (var i = 0; i < billsObj.results.length; i++) {
        allBillsHTML += makeBillHTML(billsObj.results[i])
    }
    containerNode.innerHTML = allBillsHTML
    hideGif()
}

function hideGif() { // hides loading gif once bills are displayed
    var loadingIcon = document.querySelector('.loading_div')
    loadingIcon.style.display = 'none'
}

//--------------------------------------------------
// SEARCH BAR
//--------------------------------------------------

function getBills(url) {
    var billsPromise = $.getJSON(url) // getJSON is a method that takes the input url and makes a request to the server at that location
    billsPromise.then(handleBillsResponse) // getJSON returns a promise that will resolve when the response to the request comes in
}

var inputSearch = document.querySelector('.searchBar')

inputSearch.addEventListener('keydown', function(eventObj) {
    if (eventObj.keyCode === 13) {
        var fullURL = searchURL + eventObj.target.value
        getBills(fullURL)
    }
})

//--------------------------------------------------
// ROUTER
//--------------------------------------------------
function router() { //hash routing determines what view you'll get based on the hash in the url
    if (location.hash === '#home') {
        showHome()
    } 
    else if (location.hash === '#billSearch') {
        showBillSearch()
    }
    else {
        location.hash = 'home' //defaults to home view if the hash is initially blank
    }
}

function showHome() {
    var containerNode = document.querySelector('.container')
    containerNode.innerHTML = '<img src=http://i.imgur.com/u2gQ5yK.gif>'
}

var showBillSearch = function() {
    getBills(baseURL)
}

window.addEventListener('hashchange', router) //hashchange is an eventListener. once it happens the router function above runs

router() // Start the Router
