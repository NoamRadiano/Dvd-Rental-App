import React, { useEffect, useState } from 'react';
// import {Link, useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import movieService from '../services/movieService';
import moment from 'moment';


const AddMovie = (props=null) => {

    if(props.categories.length == 0) {
        console.log("categories is not pass.");
    };

    const [title, setTitle] = useState("");
    const [information, setInformation] = useState("");
    const [director, setDirector] = useState('');
    const [scripts, setScripts] = useState('');
    const [age, setAge] = useState(true);
    const [price, setPrice] =useState(0);
    const [quantity, setQuantity] =useState(0);
    const [releaseDate, setReleaseDate] =useState('');
    const [duration, setDuration] =useState(0);
    const [categoryId, setCategoryId] = useState(props.categories[0].id);
    const [alert, setAlert] = useState(null);
    const [file, setFile] = useState("");
    const [filePreview, setFilePreview] = useState(null);
    const [valid, setValid] = useState("");

    const onChangeTitle = (e) => {
        const title = e.target.value;

        if(props.movies && props.movies.length){
            if(props.movies.find(movie=>movie.title == title)){
                setValid("is-invalid");
            }
            else{
                setValid("");
            }
        }
        setTitle(title);
    };
    const onChangeInformation = (e) => {
        setInformation(e.target.value);
    };
    const onChangeDirector = (e) => {
        setDirector(e.target.value);
    };
    const onChangeScripts = (e) => {
        setScripts(e.target.value)
    }
    const onChangeAge = (age) => {
        setAge(age);
    };
    const onChangePrice = (e) => {
        setPrice(e.target.value)
    };
    const onChangeReleaseDate = (e) => {
        setReleaseDate(e.target.value)
    };
    const onChangeDuration = (e) => {
        console.log(e.target.value);
        setDuration(e.target.value)
    };
    const onChangeCategoryId = (e) => {
        setCategoryId(e.target.value)
    };
    const onChangeQuantity = (e) => {
        setQuantity(e.target.value)
    };

    // Read file content to ArrayBuffer
    function readFileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            // Register callback function when file reading is complete
            reader.onload = function(event) {
                const arrayBuffer = event.target.result;
                resolve(arrayBuffer);
            };
            // Read file content to ArrayBuffer
            // reader.readAsArrayBuffer(file);

            // Read file content to base64 String
            reader.readAsDataURL(file);
        });
    }

    // Convert ArrayBuffer to hexadecimal string
    function arrayBufferToHexString(arrayBuffer) {
        const uint8Array = new Uint8Array(arrayBuffer);
        let hexString = "";
        for (let i = 0; i < uint8Array.length; i++) {
            const hex = uint8Array[i].toString(16).padStart(2, "0");
            hexString += hex;
        }
        return hexString;
    }
// Hex to Base64
    function hexToBase64(hexstring) {
        return btoa(hexstring.match(/\w{2}/g).map(function(a) {
            return String.fromCharCode(parseInt(a, 16));
        }).join(""));
    }
// Base64 to Hex
    function base64ToHex(str) {
        for (var i = 0, bin = window.atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
            let tmp = bin.charCodeAt(i).toString(16);
            if (tmp.length === 1) tmp = "0" + tmp;
            hex[hex.length] = tmp;
        }
        return hex.join("");
    }

    const handleFileChange = (e) =>{
        const file = e.target.files[0]; // Get selected file
        setFile(file);
        let prev = "";
        if (file) {
            readFileToArrayBuffer(file)
                .then(arrayBuffer => {
                    prev = arrayBuffer;
                     arrayBuffer = arrayBuffer.substr(arrayBuffer.indexOf("64,")+3);
                    // const hexString = base64ToHex(arrayBuffer);
                     setFile(arrayBuffer);
                    setFilePreview(prev);

                })
                .catch(error => {
                    console.error("File read failed:", error);
                });
        } else {
            setFilePreview("Please select a file");
        }
    }

    const handleAddMovie = (e) => {
        e.preventDefault();
        const movie= {
            "title": title,
            "information": information,
            "director": director,
            "scripts": scripts,
            "quantity": quantity,
            "imgData": file,
            "rating": 0,
            "age": age,
            "price": price,
            "releaseDate": releaseDate,
            "duration": duration,
            "category": {
                "id": categoryId
            }
        }
        // const data = new FormData();
        // data.append('movie', JSON.stringify(movie));
        // data.append('image', file);
        // setAlert("");
        movieService.addMovie(movie).then((res) => {

           /* const data = new FormData();
            data.append('id', res.data.id);
            data.append('image', file);
            movieService.uploadImg(data).then((res)=>{
                setAlert(<div className="alert alert-success alert-dismissible">
                    <strong>Success!</strong> Added new movie.
                </div>);
                console.log(res)
            }).catch(error => {
                setAlert(<div className="alert alert-danger alert-dismissible">
                    <strong>Failed!</strong> {error.message}
                </div>);
                console.error('Login failed', error.message);
            });*/
            setAlert(<div className="alert alert-success alert-dismissible">
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                <strong>Success!</strong> Added new movie.
            </div>);
        }).catch(error => {
            console.error('Login failed', error.message);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
            else if(error.response.status && error.response.status === 400)
                setAlert(
                <div className="alert alert-warning alert-dismissible">
                <strong>Failed!</strong> Movie name is already exited!
            </div>);
        });
    };
    const handleCancel = () => {
        window.location.reload(false);
    };
    return (
        <Form onSubmit={handleAddMovie} className="col-sm-7 was-validated">
            {alert}
            <div className="mb-3 mt-3">
                <label htmlFor="title" className="form-label">Movie Name:</label>
                <input type="text" className={`form-control custom-input ${valid}`} id="title" placeholder="Type in movie name." name="title"
                       value={title}
                       onChange={onChangeTitle}
                       required/>
                <div className="invalid-feedback">Please fill out new movie name.</div>
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="information" className="form-label">Movie Information:</label>
                <input type="text" className="form-control custom-input" id="information" placeholder="Type in information about movie." name="information"
                       value={information}
                       onChange={onChangeInformation}
                       required/>
                <div className="invalid-feedback">Please fill out movie information.</div>
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="director" className="form-label">Director name:</label>
                <input type="text" className="form-control custom-input" id="director" placeholder="Type in the name of movie director." name="director"
                       value={director}
                       onChange={onChangeDirector}
                       required/>
                <div className="invalid-feedback">Please fill out director name.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="scripts" className="form-label">Scripts:</label>
                <input type="text" className="form-control custom-input" id="scripts" placeholder="Enter movie scripts." name="scripts"
                       value={scripts}
                       onChange={onChangeScripts}
                       required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out Scripts.</div>
            </div>
            <div className="mb-3">
                <label className="me-5 text-lg-end" style={{fontSize:"20px"}}>Age: </label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="age" id="age+"
                           value={true}
                           checked={age===true}
                           onChange={()=>onChangeAge(true)}
                               />
                    <label className="form-check-label" htmlFor="age+">18+</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="age" id="age-"
                           value={false}
                           checked={age===false}
                           onChange={()=>onChangeAge(false)}
                    />
                    <label className="form-check-label" htmlFor="age-">Under 18</label>
                </div>
            </div>
            <div className="mb-3">
                <label className="me-5 text-lg-end" style={{fontSize:"20px"}}>Categories: </label>
                <div className="form-check form-check-inline">
                    <Form.Select value={categoryId} onChange={onChangeCategoryId}>
                        {props.categories.map((item) =>
                        <option key={item.id} value={item.id}> {item.name} </option>)}
                    </Form.Select>
                </div>
            </div>

            {/*<Form.Group className="mb-3" controlId="duration">*/}
                {/*<Form.Label className="form-label" style={{fontSize:"20px"}}>Duration:</Form.Label>*/}
                {/*<div className="form-check form-check-inline">*/}
                    {/*<Form.Control type="number" placeholder="Enter duration of movie." onChange={onChangeDuration} value={duration}/>*/}
                    {/*<Form.Text*/}
                        {/*id="duration"*/}
                        {/*className="invalid-feedback"*/}
                        {/*bsPrefix="geeks-form-text"*/}
                        {/*as="div"*/}

                    {/*>*/}
                        {/*Please fill out Scripts.*/}
                    {/*</Form.Text>*/}

                {/*</div>*/}
            {/*</Form.Group>*/}
            <div className="mb-3">
                <label htmlFor="duration" className="form-label">Duration:</label>
                <input type="number" min={1} className="form-control custom-input" id="duration" placeholder="Enter movie scripts." name="duration"
                       value={duration}
                       onChange={onChangeDuration}
                       required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out duration.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="releaseDate" className="form-label">Release Date:</label>
                <input type="date" className="form-control custom-input" id="releaseDate" max={moment().format("YYYY-MM-DD")} placeholder="Enter movie released date." name="releaseDate"
                       value={releaseDate}
                       onChange={onChangeReleaseDate}
                       required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out released date.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:</label>
                <input type="number" min={0.0} step={0.1} className="form-control custom-input" id="price" placeholder="Enter price of movie." name="price"
                       value={price}
                       onChange={onChangePrice}
                       required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out price.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity:</label>
                <input type="number" min={1} className="form-control custom-input" id="price" placeholder="Enter quantity of movie." name="quantity"
                       value={quantity}
                       onChange={onChangeQuantity}
                       required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out quantity.</div>
            </div>
            {filePreview &&
            <div className="mb-3">
                <img src={`${filePreview}`} className="img-fluid w-100"/>
            </div>
            }
            <div className="mb-3">
                <label className="me-5 text-lg-end" style={{fontSize:"20px"}}>Insert Image: </label>
                <div className="form-check form-check-inline">
                    <input type="file" accept=".jpg, .png, .jpeg, .gif" className="form-control custom-input" id="img" placeholder="Type in information about movie." name="image"
                           onChange={handleFileChange}
                           required/>
                    <div className="invalid-feedback">Please choose image of movie.</div>
                </div>
            </div>

            <Row>
                <Col sm={6}>
                    <Button variant="outline-primary" className="w-100" size="lg" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Col>
                <Col sm={6}>
                    <Button type="submit" variant="primary" className="w-100" size="lg">
                        Save
                    </Button>
                </Col>
            </Row>

        </Form>
    );
};

export default AddMovie;