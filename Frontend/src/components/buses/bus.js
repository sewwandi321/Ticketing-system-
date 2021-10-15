import React, { Component, useRef } from 'react'
import axios from "axios";
import { Container } from 'react-bootstrap';
import Select from 'react-select';
import Layout from '../../components/Layout'
import './style.css';


const initialState = {
    platenumber: '',
    time: '',
    drivername: '',
    contact: '',
    city: '',
    routes: [],
    options: [],
    selectedroutes: [],



}


class AddBuses extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRoutesselected = this.onRoutesselected.bind(this);
        this.state = initialState;

    }






    componentDidMount() {
        axios.get('http://localhost:8065/api/route/viewall')
            .then(res => {
                this.setState({ routes: res.data.data }, () => {
                    let data = [];
                    this.state.routes.map((item, index) => {
                        let routes = {
                            value: item._id,
                            label: item.routeId
                        }
                        data.push(routes)
                    });
                    this.setState({ options: data })
                })
            })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onRoutesselected(e) {
        this.setState({ selectedroutes: e ? e.map(item => item.value) : [] });
    }





    //ddddd

    onSubmit(e) {



        e.preventDefault();
        let busGroup = {
            platenumber: this.state.platenumber,
            time: this.state.time,
            drivername: this.state.drivername,
            contact: this.state.contact,
            city: this.state.city,
            routeId: this.state.selectedroutes,

        };

        let currentComponent = this;
        axios.post('http://localhost:8065/api/bus/createbus', busGroup)
            .then(res => {
                alert('added');

                console.log('added');

                currentComponent.setState({
                    platenumber: '',
                    time: '',
                    drivername: '',
                    contact: '',
                    city: '',
                    routeId: ''
                })
            })
            .catch(err => {
                console.log(err);
            })




    }



    render() {
        return (

            <Layout sidebar>
                <Container>

                    <div className="header">
                        <div className="headerTitles">
                            <span className="headerTitleLg">Add Buses</span>
                        </div>
                        <div className="container-form">
                            <form onSubmit={this.onSubmit} noValidate>
                                <div class="form-group">
                                    <label htmlFor="name">Plate Number</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="platenumber"
                                        name="platenumber"
                                        value={this.state.platenumber}
                                        onChange={this.onChange}
                                        placeholder="Enter plate number"
                                    />




                                </div>
                                <div class="form-group">
                                    <label for="des">Time</label>
                                    <input
                                        required
                                        type="time"
                                        className="form-control"
                                        id="time"
                                        name="time"
                                        value={this.state.time}
                                        onChange={this.onChange}
                                        placeholder="Enter time" />


                                </div>
                                <div class="form-group">
                                    <label for="des">Driver Name</label>
                                    <input
                                        required
                                        type="drivername"
                                        className="form-control"
                                        id="drivername"
                                        name="drivername"
                                        value={this.state.drivername}
                                        onChange={this.onChange}
                                        placeholder="Enter name"
                                    />


                                </div>
                                <div class="form-group">
                                    <label for="des">Contact Number</label>
                                    <input
                                        required
                                        type="number"
                                        className="form-control"
                                        id="contact"
                                        name="contact"
                                        value={this.state.contact}
                                        onChange={this.onChange}
                                        placeholder="Enter Contact number"
                                    />


                                </div>

                                <label htmlFor="name">Route Number</label>
                                <Select
                                    options={this.state.options}
                                    onChange={this.onRoutesselected}
                                    className="basic-multi-select"
                                    isMulti />






                                <div class="form-group">
                                    <label for="des">City</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        name="city"
                                        value={this.state.city}
                                        onChange={this.onChange}
                                        placeholder="Enter City"
                                    />


                                </div>




                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>



                        </div>
                    </div>
                </Container>



            </Layout>
        )
    }
}
export default AddBuses;