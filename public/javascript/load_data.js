import {tiempoArr, precipitacionArr, uvArr, temperaturaArr} from './static_data.js';

let fechaActual = () => new Date().toISOString().slice(0,10);

let cargarPrecipitacion = () => {

    //Obtenga la función fechaActual
    let actual = fechaActual();
    //Defina un arreglo temporal vacío
    let datos = []
    //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const precipitacion = precipitacionArr[index]
    
        if(tiempo.includes(actual)) {
          datos.push(precipitacion)
        }
      }
    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
    let max = Math.max(...datos)
    let min = Math.min(...datos)
    let sum = datos.reduce((a, b) => a + b, 0);
    let prom = (sum / datos.length) || 0;
    //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
    let precipitacionMinValue = document.getElementById("precipitacionMinValue")
    let precipitacionPromValue = document.getElementById("precipitacionPromValue")
    let precipitacionMaxValue = document.getElementById("precipitacionMaxValue")
    //Actualice los elementos HTML con los valores correspondientes
    precipitacionMinValue.textContent = `Min ${min} [mm]`
    precipitacionPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
    precipitacionMaxValue.textContent = `Max ${max} [mm]`
  
  }

  let cargarUv = () => {

    //Obtenga la función fechaActual
    let actual = fechaActual();
    //Defina un arreglo temporal vacío
    let datos = []
    //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const precipitacion = uvArr[index]
    
        if(tiempo.includes(actual)) {
          datos.push(precipitacion)
        }
      }
    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
    let max = Math.max(...datos)
    let min = Math.min(...datos)
    let sum = datos.reduce((a, b) => a + b, 0);
    let prom = (sum / datos.length) || 0;
    //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
    let uvMinValue = document.getElementById("uvMinValue")
    let uvPromValue = document.getElementById("uvPromValue")
    let uvMaxValue = document.getElementById("uvMaxValue")
    //Actualice los elementos HTML con los valores correspondientes
    uvMinValue.textContent = `Min ${min} [mm]`
    uvPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
    uvMaxValue.textContent = `Max ${max} [mm]`
  
  }

  let cargarTemperatura = () => {

    //Obtenga la función fechaActual
    let actual = fechaActual();
    //Defina un arreglo temporal vacío
    let datos = []
    //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const precipitacion = temperaturaArr[index]
    
        if(tiempo.includes(actual)) {
          datos.push(precipitacion)
        }
      }
    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
    let max = Math.max(...datos)
    let min = Math.min(...datos)
    let sum = datos.reduce((a, b) => a + b, 0);
    let prom = (sum / datos.length) || 0;
    //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
    let temperaturaMinValue = document.getElementById("temperaturaMinValue")
    let temperaturaPromValue = document.getElementById("temperaturaPromValue")
    let temperaturaMaxValue = document.getElementById("temperaturaMaxValue")
    //Actualice los elementos HTML con los valores correspondientes
    temperaturaMinValue.textContent = `Min ${min} [mm]`
    temperaturaPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
    temperaturaMaxValue.textContent = `Max ${max} [mm]`
  
  }

  cargarTemperatura();
  cargarUv();
  cargarPrecipitacion();

  let cargarFechaActual = () => {
  
    //Obtenga la referencia al elemento h6
    let coleccionHTML = document.getElementsByTagName("h6")

    let tituloH6 = coleccionHTML[0]
    //Actualice la referencia al elemento h6 con el valor de la función fechaActual()
    tituloH6.textContent = fechaActual()
  }
  
 //guia 9
  
  cargarFechaActual()

  let cargarOpenMeteo = () => {

    //URL que responde con la respuesta a cargar
    let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.9005&longitude=-79.0045&hourly=temperature_2m&timezone=auto'; 
  
    fetch( URL )
      .then(responseText => responseText.json())
      .then(responseJSON => {
        
          //Respuesta en formato JSON
      
          //Referencia al elemento con el identificador plot
          let plotRef = document.getElementById('plot1');
      
          //Etiquetas del gráfico
          let labels = responseJSON.hourly.time;
      
          //Etiquetas de los datos
          let data = responseJSON.hourly.temperature_2m;
      
          //Objeto de configuración del gráfico
          let config = {
            type: 'line',
            data: {
              labels: labels, 
              datasets: [
                {
                  label: 'Temperature [2m]',
                  data: data, 
                }
              ]
            }
          };
      
          //Objeto con la instanciación del gráfico
          let chart1  = new Chart(plotRef, config);
        
        
        console.log(responseJSON);
        
        //Respuesta en formato JSON
  
      })
      .catch(console.error);
  
  }

  cargarOpenMeteo()

  let cargarOpenMeteo2 = () => {

    //URL que responde con la respuesta a cargar
    let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=rain&timezone=auto&forecast_days=14'; 
  
    fetch( URL )
      .then(responseText => responseText.json())
      .then(responseJSON => {
        
          //Respuesta en formato JSON
      
          //Referencia al elemento con el identificador plot
          let plotRef = document.getElementById('plot2');
      
          let labels = responseJSON.hourly.time;

        // Datos de lluvia para el gráfico de barras
        let rainData = responseJSON.hourly.rain;

        // Objeto de configuración del gráfico
        const data = {
          labels: labels,
          datasets: [{
            label: 'Rain Data',
            data: rainData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          }]
        };

        const config = {
          type: 'bar',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
        };


        //Objeto con la instanciación del gráfico
        let chart1 = new Chart(plotRef, config);


        console.log(responseJSON);

        //Respuesta en formato JSON

      })
      .catch(console.error);
  
  }

  cargarOpenMeteo2()

  // guia 09
  let parseXML = (responseText) => {
  
    // Parsing XML
    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, "application/xml");

    
    let forecastElement = document.querySelector("#forecastbody")
    forecastElement.innerHTML = ''

    // Procesamiento de los elementos con etiqueta `<time>` del objeto xml
    let timeArr = xml.querySelectorAll("time")

    timeArr.forEach(time => {
        
        let from = time.getAttribute("from").replace("T", " ")

        let humidity = time.querySelector("humidity").getAttribute("value")
        let windSpeed = time.querySelector("windSpeed").getAttribute("mps")
        let precipitation = time.querySelector("precipitation").getAttribute("probability")
        let pressure = time.querySelector("pressure ").getAttribute("value")
        let cloud = time.querySelector("clouds").getAttribute("all")

        let template = `
            <tr>
                <td>${from}</td>
                <td>${humidity}</td>
                <td>${windSpeed}</td>
                <td>${precipitation}</td>
                <td>${pressure}</td>
                <td>${cloud}</td>
            </tr>
        `

        //Renderizando la plantilla en el elemento HTML
        forecastElement.innerHTML += template;
    })
  
    console.log(xml)
  
  }
  
  //Callback
  let selectListener = async (event) => {

    let selectedCity = event.target.value

    let cityStorage = localStorage.getItem(selectedCity);

    

    try {

        //API key
        let APIkey = '3875780b0fb7e1d7f7b7c54de97c781b'
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=xml&appid=${APIkey}`

        let response = await fetch(url)
        let responseText = await response.text()
        
        await parseXML(responseText)

    } catch (error) {
        console.log(error)
    }

}
  
  let loadForecastByCity = () => {
  
  //Handling event
  let selectElement = document.querySelector("select")
  selectElement.addEventListener("change", selectListener)
  
  }
  
  loadForecastByCity()
  


  // guia 10





  let loadExternalTable = async() => {
    console.log("Gestion de riesgo")

     let proxyURL = 'https://cors-anywhere.herokuapp.com/'
     let url = proxyURL + 'https://www.gestionderiesgos.gob.ec/monitoreo-de-inundaciones/'


    let response= await fetch(url)
    let responseText =await response.text()

    const parser= await new DOMParser();
    const xml =await parser.parseFromString(responseText, "text/html")

    let table= await xml.querySelector("#postcontent table")
    document.getElementById("monitoreo").innerHTML=table.outerHTML




   }

 
   loadExternalTable()

