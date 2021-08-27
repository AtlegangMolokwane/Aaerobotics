import React from "react";
import axios from "axios";
import { LoadScript } from "@react-google-maps/api";
import Maps from "./Maps";
import "./MapAPI.css";

class MapAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiRes: [],
      treeRes: [],
    };
  }
  apiUrl = () => {
    const config = {
      method: "get",
      url: "https://sherlock.aerobotics.com/developers/orchards/",
      headers: {
        accept: "application/json",
        Authorization: "1566394169B0EJX2MGAVKVUGGKEMKZBMND9A7VCR",
        "X-CSRFToken":
          "lhpuvU3EOjWK6PfrllaoBpAd0CaXBF1o3fX5RmZoduIWYZl5uMXKmI2hHldlYTOb",
      },
    };

    axios(config)
      .then(function (response) {
        var res = JSON.stringify(response.data.results[0]);
        var res1 = JSON.parse(res);
        return (res1 = [res1].flat());
      })
      .then((res) => {
        if (res) {
          this.setState({
            apiRes: [...this.state.apiRes, ...res],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  treeUrl = () => {
    const config = {
      method: "get",
      url: "https://sherlock.aerobotics.com/developers/treesurveys/",
      headers: {
        accept: "application/json",
        Authorization: "1566394169B0EJX2MGAVKVUGGKEMKZBMND9A7VCR",
        "X-CSRFToken":
          "6f83nAwjINIVgw7kWRiN2lSf2VDf00YvOdGEJ2s37Yu78GdY5i59NEkjJEGDneLi",
      },
    };

    axios(config)
      .then(function (response) {
        var res = JSON.stringify(response.data);
        var res1 = JSON.parse(res);
        return (res1 = [res1].flat());
      })
      .then((res) => {
        if (res) {
          this.setState({
            treeRes: [...this.state.treeRes, ...res],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.treeUrl();
    this.apiUrl();
  }

  render() {
    return (
      <div>
        <h2 className="head_border">Farm Info</h2>
        <div>
          {this.state.apiRes.map((data) => {
            return (
              <div className="p_block" key={data.id}>
                <p className="border">Client_id : {data.client_id}</p>
                <p className="border">Name : {data.name} </p>
                <p className="border">Farm_id : {data.farm_id}</p>
                <p className="border">Hectares : {data.hectares}</p>
              </div>
            );
          })}
        </div>
        <LoadScript googleMapsApiKey="AIzaSyDOpRsyAUVQtW6BdTlr6O7WzkLNDL_VIDY">
          <Maps data={this.state.treeRes} />
        </LoadScript>
      </div>
    );
  }
}

export default MapAPI;
