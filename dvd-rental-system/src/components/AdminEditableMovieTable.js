import React, { useState, useEffect } from 'react';
import { Alert, Table} from 'react-bootstrap';
import movieService from "../services/movieService";

const EditableMovieTalbe = (props = null) => {
    const [message, setMessage] = useState(null);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        setMovies(props.movies);
    },[props.movies]);
    if(!props.movies) return <div> There is not exist data.</div>;
    var index = 1;

    const handleDelete = (e) => {
        setMessage(<div className="alert alert-warning alert-dismissible">
             Delete requesting....
        </div>);

        let id = e.target.id;
        movieService.deleteMovie(id).then( res =>{
            alert("Successfully deleted!");
            window.location.reload(false);
        }).catch(error =>{

            setMessage(<div className="alert alert-danger alert-dismissible">
                <strong>Failed delete!</strong> {error.message}
            </div>);
            console.error("Failed delete", error);
            if(error.response.status && error.response.status === 403) window.location.assign("/login");
        })
    };
   return (
        <>
            {message}
            <Table className="mt-4" hover size="lg">
                <thead>
                <tr>
                    <th width="30"></th>
                    <th width="270">Movie Name</th>
                    <th width="170"></th>
                </tr>
                </thead>
                <tbody>
                {movies && movies.map((movie) =>
                <tr key={movie.id}>
                    <td>{index++}.</td>
                    <td>{movie.title}</td>
                    <td>
                        <a href={`/admin/movies/${movie.id}/edit`} className="btn btn-sm btn-primary me-3"> Edit <i className="fa fa-pencil"/></a>
                        <button className="btn btn-sm btn-custom" id ={movie.id} onClick={handleDelete}> Delete <i className="fa fa-trash-o"/></button>
                    </td>
                </tr>
                )}
                </tbody>
            </Table>
        </>
    );
};

export default EditableMovieTalbe