import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./Data.css";

const Modal = ({ isShowing, hide, selectMovieList }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        {console.log(selectMovieList, "selectMovieList")}
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modelHeading"> Favorite Movie List</div>

                <div className="container">

                    {selectMovieList.map((data, index) => {
                        return (
                            <div className="imageViewContaner">
                                <div className="imageTextview">
                                    <img src={"https://image.tmdb.org/t/p/original" + data.poster_path} className="imageView" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;


export default Modal;