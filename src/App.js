import React,{Component} from 'react';
import Titles from './components/Titles.jsx'
import Form from './components/Form.jsx'
import Weather from './components/Weather.jsx'


const API_KEY= "cc963fc87bc13bdcfbbb90665803c6b4"

class App extends Component{

  state={
    temperature:undefined,
    city:undefined,
    country:undefined,
    humidity:undefined,
    description:undefined,
    error:undefined,
    col5:undefined,
    col6:undefined

  }
  getWeather= async(e)=>{
    e.preventDefault()
    const city=e.target.elements.city.value
    const country=e.target.elements.country.value
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data=await api_call.json()
    if(city && country )
    {
  
    this.setState({
      temperature:data.main.temp,
      city:data.name,
      country:data.sys.country,
      humidity:data.main.humidity,
      description:data.weather[0].description,
      error:undefined})
    
    }else{
      this.setState({
        temperature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:"Please enter the values"})
      
      
    }
  } 

  updateDimensions=()=>{
  var w = window.innerWidth;
  var h = window.innerHeight;
  
  if(w<770){
    console.log("lessss")
    this.setState({
      col5:'col-5 title-container-mobile',
      col6:'col-6 form-container-mobile'

    })
  }else{
    console.log("greater")
    this.setState({
      col5:'col-xs-5 title-container',
      col6:'col-xs-6 form-container'

    })

  }}

  componentDidMount(){
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions);
      }
  render(){

    return(
      <div>
        <div className="wrapper">
          <div className="main ">
            <div className="container ">
              <div className="row ">
                  <div className={this.state.col5}>
                      <Titles />
                  </div>
                  <div className={this.state.col6}>
                      <Form getWeather={this.getWeather} />
                      <Weather 
                        temperature={this.state.temperature} 
                        humidity={this.state.humidity}
                        city={this.state.city}
                        country={this.state.country}
                        description={this.state.description}
                        error={this.state.error}
                      />
                </div>
              </div>
           </div>
        </div>
        </div>
      </div>
    )
  }
}
export default App;

