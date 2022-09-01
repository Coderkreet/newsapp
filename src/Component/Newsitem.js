import React from 'react'

const Newsitem =(props)=> {
   let {title, description , imgUrl , url , author,date,source}  = props;

    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : "50%", zIndex : "1" } }>
    {source}
  </span>
          <img src={!imgUrl?'https://i0.wp.com/indiaeducationdiary.in/wp-content/uploads/2020/08/Default-Image-IED.png?fit=534%2C462&ssl=1' : imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title"> {title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By ({!author ? "Unkonwn" : author})  On:- {new Date(date).toUTCString()}</small></p>
              <a rel="noreferrer" href={url} target="_blank" className="btn btn-dark btn-sm">Read more</a>
            </div>
        </div>
      </div>
    )

}

export default Newsitem
