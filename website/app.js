/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '528a6a07f8296bf4cf8a299ead0dc29f&units=imperial'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to GET data */
document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
    const zipCode =  document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;

    getWeather(baseURL, zipCode, apiKey)

    .then(function(weatherData){
        postData('http://localhost:8000/add', {temp:weatherData.main.temp, date:newDate, feel:userFeeling})
        updateUI()
    })
}

/* Funtion to GET data from weather API */
const getWeather = async (baseURL, zip, apiKey)=>{

  const res = await fetch(baseURL+zip+'&appid='+apiKey);
  try {
    const weatherData = await res.json();
    return weatherData;
  }  catch(error) {
    console.log("error", error);
  }
};

/* Function to POST data to my API */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        return newData
      }catch(error) {
      console.log("error", error);
      }
};

/* Function to update UI with new data */
const updateUI = async ()=>{

    const response = await fetch('http://localhost:8000/all')

    try{
        const recentEntry = await response.json()

        document.getElementById('temp').innerHTML = "Temp: "+recentEntry.temp;
        document.getElementById('date').innerHTML = "Date: "+recentEntry.date;
        document.getElementById('content').innerHTML = "I Feel: "+recentEntry.feel;

    } catch(error){
        console.log('error', error)
    }
};