import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src="https://static01.nyt.com/images/2021/12/12/fashion/11MARTINELLIS1/11MARTINELLIS1-facebookJumbo.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="/#" className="btn btn-primary">
              Read
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
