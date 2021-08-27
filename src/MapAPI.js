import React from 'react';
import axios from "axios";
import { LoadScript } from "@react-google-maps/api";
import Maps from "./Maps";
import "./MapAPI.css";


class MapAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRes: [],
        };
        
    }
    apiUrl =() =>{
        const config = {
                method: 'get',
                url: 'https://sherlock.aerobotics.com/developers/orchards/',
                headers: {
                  'accept': 'application/json',
                  'Authorization': '1566394169B0EJX2MGAVKVUGGKEMKZBMND9A7VCR',
                  'X-CSRFToken': 'lhpuvU3EOjWK6PfrllaoBpAd0CaXBF1o3fX5RmZoduIWYZl5uMXKmI2hHldlYTOb'
                },
            }
          
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data.results[0]));
                var res = JSON.stringify(response.data.results[0]);
                return res
              }).then(res => {
                      console.log('This is your data', res)
                      if(res){
                          this.setState({
                              apiRes: [...this.state.apiRes, ...res]
                          })
                      }
                    })
              .catch(function (error) {
                console.log(error);
              });
              
        }
    componentDidMount(){
        this.apiUrl();  
    }

  render() {
      
    return (
    <div >
        <h2 className = "head_border">Farm Info</h2>
        <div className = "p_block">           
            <p className = "border">Client_id : 10479</p>
            <p className = "border">Name : 03 Olinda valencia </p>
            <p className = "border">Farm_id : 8919</p>
            <p className = "border">Hectares : 2.2419824367885</p>           
        </div>
        <LoadScript googleMapsApiKey="AIzaSyDOpRsyAUVQtW6BdTlr6O7WzkLNDL_VIDY">
            <Maps data= {this.state.apiRes} />
        </LoadScript>
    </div>
  );}
}

export default MapAPI;