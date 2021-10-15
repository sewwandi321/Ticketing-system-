import React, { Component, useRef } from 'react'
import UserLayout from '../userLayout'
import { Container } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios";
import Pdf from "react-to-pdf";
import './style.css';

const ref = React.createRef();
const initialState = {
    nic: '',
    phone: '',
    date: '',
    time: '',
    quantity: '',
    startingPoint: '',
    endingPoint: ''

}

class AddBooking extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
        this.validator = new SimpleReactValidator();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let bookingGroup = {
            nic: this.state.nic,
            phone: this.state.phone,
            date: this.state.date,
            time: this.state.time,
            quantity: this.state.quantity,
            startingPoint: this.state.startingPoint,
            endingPoint: this.state.endingPoint
        };

        axios.post('http://localhost:8065/api/bus/booking', bookingGroup)
            .then(res => {
                alert('added');

                console.log('added');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (

            <UserLayout>
                <Container>


                    <div className="header">
                        <div className="headerTitles">
                            <span className="headerTitleLg">Booking </span>
                        </div>
                        <div className="container-form">
                            <form onSubmit={this.onSubmit} noValidate>
                                <div class="form-group">
                                    <label htmlFor="name">NIC   </label>
                                    <input
                                        required type="text"
                                        className="form-control"
                                        id="nic"
                                        name="nic"
                                        value={this.state.nic}
                                        onChange={this.onChange}
                                        placeholder="Enter Your NIC"
                                    />


                                    {this.validator.message('nic', this.state.nic, 'required|min:1|max:10', { className: 'text-danger' })}

                                </div>

                                <div class="form-group">
                                    <label for="des">Contact No</label>
                                    <input
                                        required type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.onChange}
                                        placeholder="Enter Contact number"
                                    />

                                    {this.validator.message('phone', this.state.phone, 'required|phone', { className: 'text-danger' })}
                                </div>

                                <div class="form-group">
                                    <label for="des">Date</label>
                                    <input
                                        required
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        name="date"
                                        value={this.state.date}
                                        onChange={this.onChange}
                                        placeholder="Enter Date" />

                                    {this.validator.message('date', this.state.date, 'required', { className: 'text-danger' })}
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

                                    {this.validator.message('time', this.state.time, 'required', { className: 'text-danger' })}
                                </div>


                                <div class="form-group">
                                    <label for="des">From:</label>
                                    <input
                                        required type="text"
                                        className="form-control"
                                        id="startingPoint"
                                        name="startingPoint"
                                        value={this.state.startingPoint}
                                        onChange={this.onChange}
                                        placeholder="Enter City"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="des">To:</label>
                                    <input
                                        required type="text"
                                        className="form-control"
                                        id="endingPoint"
                                        name="endingPoint"
                                        value={this.state.endingPoint}
                                        onChange={this.onChange}
                                        placeholder="Enter City"
                                    />
                                </div>


                                <div class="form-group">
                                    <label for="des">Quantity</label>
                                    <input
                                        required type="Number"
                                        className="form-control"
                                        id="quantity"
                                        name="quantity"
                                        value={this.state.quantity}
                                        onChange={this.onChange}
                                        placeholder="Enter Quantity"
                                    />

                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>
                                <button type="button " class="pay-btn"><a href="/payment">Pay</a></button>
                            </form>

                            <div ref={ref}>
                                <h1>Ticket</h1>

                                <p>NIC : {this.state.nic}</p>
                                <p>ContactNo : {this.state.phone}</p>
                                <p>Date : {this.state.date}</p>
                                <p>Time : {this.state.time}</p>
                                <p>From : {this.state.startingPoint}</p>
                                <p>To : {this.state.endingPoint}</p>
                                <p>Quantity : {this.state.quantity}</p>

                            </div>
                            <Pdf targetRef={ref} filename="recept.pdf">
                                {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
                            </Pdf>
                        </div>
                    </div>
                </Container>

            </UserLayout>
        )
    }

}
export default AddBooking;

