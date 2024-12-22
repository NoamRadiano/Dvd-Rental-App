import React, {useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import movieService from '../services/movieService';
import useGlobalState from '../stores/useGlobalState';

const EditMovie = (props=null) => {
    if(props.categories.length == 0) {
        console.log("categorys is not pass.");
    };
    const {role, setRole} = useGlobalState();
    const [movie, setMovie] = useState(props.movie);
    const [alert, setAlert] = useState(null);

    const onChangeMovie = (e) =>{

        let { name, value } = e.target;
        if(name === "categoryId"){
            name = "category";
            value = {id: value};
        }
        setMovie(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const onChangeAge = (age) => {
        setMovie(prevState => ({
            ...prevState,
            "age": age
        }));
        setRole("ok");
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

    // Hex to Base64
    function hexToBase64(hexstring) {
        return btoa(hexstring.match(/\w{2}/g).map(function(a) {
            return String.fromCharCode(parseInt(a, 16));
        }).join(""));
    }
    // Base64 to Hex
    function base64ToHex(str) {
        for (var i = 0, bin = window.atob(str.replace(/[ \r\n]+$/, '')), hex = []; i < bin.length; ++i) {
            let tmp = bin.charCodeAt(i).toString(16);
            if (tmp.length === 1) tmp = "0" + tmp;
            hex[hex.length] = tmp;
        }
        return hex.join('');
    }

    const handleFileChange = (e) =>{
        const file = e.target.files[0]; // Get selected file
        if (file) {
            readFileToArrayBuffer(file)
                .then(arrayBuffer => {
                    arrayBuffer = arrayBuffer.substr(arrayBuffer.indexOf("64,")+3);
                    const hexString = base64ToHex(arrayBuffer);
                    setMovie(prevState => ({
                        ...prevState,
                        "imgData": hexString
                    }));
                    // setMovie(hexString);
                })
                .catch(error => {
                    console.error("File read failed:", error);
                });
        } else {
            setMovie(prevState => ({
                ...prevState,
                "imgData": null
            }));
        }
    }

    const handleUpdateMovie = (e) => {
        e.preventDefault();
        setAlert(<div className="alert alert-warning alert-dismissible">
            <strong>Success!</strong> Movie updating...
        </div>);
        movieService.updateMovie(movie.id, movie).then((res) => {
            setAlert(<div className="alert alert-success alert-dismissible">
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                <strong>Success!</strong> Updated movie.
            </div>);
            console.log(res)
        }).catch(error => {
            setAlert(<div className="alert alert-danger alert-dismissible">
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                <strong>Failed!</strong> {error.message}
            </div>);
            if(error.response.status && error.response.status === 400)setAlert(
                <div className="alert alert-warning alert-dismissible">
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Warning!</strong> Same name is already existed!
                </div>
            );
            else if(error.response.status && error.response.status === 403) window.location.assign("/login");
            else setAlert(
                <div className="alert alert-danger alert-dismissible">
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Failed!</strong> {error.message}
                </div>
                );
        });
    };
    const handleCancel = () => {
        window.location.reload(false);
    }

    return (
        <div className="col-sm-7">
        <Form onSubmit={handleUpdateMovie} className="was-validated" id="edit_form">
            {alert}
            <div className="mb-3 mt-3">
                <label htmlFor="title" className="form-label">Movie Name:</label>
                <input type="text" className="form-control custom-input" id="title" placeholder="Type in movie name." name="title"
                       value={movie.title}
                       onChange={onChangeMovie}
                       required/>
                <div className="invalid-feedback">Please fill out movie name.</div>
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="information" className="form-label">Movie Information:</label>
                <input type="text" className="form-control custom-input" id="information" placeholder="Type in information about movie." name="information"
                       value={movie.information}
                       onChange={onChangeMovie}
                       required/>
                <div className="invalid-feedback">Please fill out movie information.</div>
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="director" className="form-label">Director name:</label>
                <input type="text" className="form-control custom-input" id="director" placeholder="Type in the name of movie director." name="director"
                       value={movie.director}
                       onChange={onChangeMovie}
                       required/>
                <div className="invalid-feedback">Please fill out director name.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="scripts" className="form-label">Scripts:</label>
                <input type="text" className="form-control custom-input" id="scripts" placeholder="Enter movie scripts." name="scripts"
                       value={movie.scripts}
                       onChange={onChangeMovie}
                       required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out Scripts.</div>
            </div>
            <div className="mb-3">
                <label className="me-5 text-lg-end" style={{fontSize:"20px"}}>Age: </label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="age" id="age+"
                           value={true}
                           checked={movie.age===true}
                           onChange={()=>onChangeAge(true)}
                               />
                    <label className="form-check-label" htmlFor="age+">18+</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="age" id="age-"
                           value={false}
                           checked={movie.age===false}
                           onChange={()=>onChangeAge(false)}
                    />
                    <label className="form-check-label" htmlFor="age-">Under 18</label>
                </div>
            </div>
            <div className="mb-3">
                <label className="me-5 text-lg-end" style={{fontSize:"20px"}}>Categories: </label>
                <div className="form-check form-check-inline">
                    <Form.Select value={movie.category.id} onChange={onChangeMovie} name="categoryId">
                        {props.categories.map((item) =>
                        <option key={item.id} value={item.id}> {item.name} </option>)}
                    </Form.Select>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="duration" className="form-label">Duration:</label>
                <input type="number" min={1} className="form-control custom-input" id="duration" placeholder="Enter movie scripts." name="duration"
                       value={movie.duration}
                       onChange={onChangeMovie}
                       required/>
                <div className="invalid-feedback">Please fill out duration.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="releaseDate" className="form-label">Release Date:</label>
                <input type="date" className="form-control custom-input" id="releaseDate" placeholder="Enter movie released date." name="releaseDate"
                       value={movie.releaseDate}
                       onChange={onChangeMovie}
                       required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out released date.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:</label>
                <input type="number" min={0.0} step={0.01} className="form-control custom-input" id="price" placeholder="Enter price of movie." name="price"
                       value={movie.price}
                       onChange={onChangeMovie}
                       required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out price.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity:</label>
                <input type="number" min={1} className="form-control custom-input" id="price" placeholder="Enter quantity of movie." name="quantity"
                       value={movie.quantity}
                       onChange={onChangeMovie}
                       required/>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out quantity.</div>
            </div>
            {movie.imgData &&
            <div className="mb-3">
                <img src={`data:image/jpeg;base64,${movie.imgData}`} className="img-fluid w-100"/>
            </div>
            }
        </Form>
            <div className="mb-3">
                <label className="me-5 text-lg-end" style={{fontSize:"20px"}}>Insert Image: </label>
                <div className="form-check form-check-inline">

                    <input type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" className="form-control custom-input" id="img" placeholder="Type in information about movie." name="imageData"
                           onChange={handleFileChange}
                           required/>
                </div>
            </div>

            <Row>
                <Col sm={6}>
                    <Button variant="outline-primary" className="w-100" size="lg" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Col>
                <Col sm={6}>
                    <input type="submit" type="submit" form="edit_form" className="btn btn-primary btn-lg  w-100" value="Update"/>
                </Col>
            </Row>
            </div>


    );
};

export default EditMovie;