# billsSearch

This is an application built using the Sunlight Foundation API. Users can view
the most current bills up for adoption and also search by senator or bill title.
Enjoy!

# Lessons Learned
* create a function which appends HTML tags that is referenced later in a loop to itterate through each model in a collection.
* If you want a loading gif, use a function that takes the gif node (selected in the DOM) and makes its' display = none once the JSON is returned and the data is loaded
* method to get JSON 1) var billsPromise = getJSON(insert API url per documenation) 2) billPromise.then(run the loop that then references the function inserting HTML)
* search bar >> 1) add 'keydown' event listener that references search node. 2) if keydown === 13 (aka ENTER key), create a variable that references the eventObj.target.value 3) take that value and use it to run your getJSON function

## Screenshot
![Bills Search](/images/bill.png)

## Installation

```
git clone https://github.com/mkhira2/billsSearch.git
cd billsSearch
open index.html
```

## License

This project is licensed under the MIT License.
