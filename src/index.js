const init = () => {
  const inputForm = document.querySelector('form');
  inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //console.log(event.target) this returns DOM element targetted by event, children then returns all the elements in it
    //console.log(event.target.children[1].value); I guess this is good if you dont know and need to dig for what you want?
    //if we know what it is we can just access it directly

    const userInput = document.querySelector("input#searchByID"); //Access it directly
    console.log(userInput.value)

    //now we need to fetch the data based upon the user input
    fetch("http://localhost:3000/movies") //access the server
        .then((resp) => resp.json())      //convert the information into json format
        .then((data) => {
            console.log(data)             //see that the data is an array
        })
    //what we could do is now take all the data and iterate over it to find the match and then return 
    //however this is bad for obvious reasons. Instead what if we can just access the info directly on the server with the user input
    //This server has REstful conventions so we can access what we need by providing the appropriate parameter in the URL
    //Since we are searching by id we can add 1 to the end. 
    //The actual way to adjust parameters I will have to find out at a later time. It seems like I can specify a specific one with ?param=value
    // https://github.com/typicode/json-server 
    //We can use stirng iterpolation to get the user data instead

    fetch(`http://localhost:3000/movies/${userInput.value}`) //now we should get the specific ID 
        .then((resp) => resp.json())
        .then((data) => {
            //console.log(data)
            //Now we want to set it up so that the info that we have gathered will now adjust the website accordingly
            //We want to have the tittle and the summary displayed
            //So lets use the data and have a function that will change the appropriate dom elements
            const title = document.querySelector("section#movieDetails h4") //can get this info looking at elements on web page or from index html
            const summary = document.querySelector("section#movieDetails p")
            //now change the textcontent into the appropriate data

            title.textContent = data.title
            summary.textContent = data.summary
            // if the fetch gives us a 404 the dom elements dissapear instead of an error or something. 
        })
}); 
}




document.addEventListener('DOMContentLoaded', init);