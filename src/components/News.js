import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalize = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state={
      articles: [],
      loading: false,
      page: 1
       
    }
    document.title=`${this.capitalize(this.props.category)} - NewsMonkey`
    
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0933133cb3f740c494ffc9c3be927ecb&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount(){
    this.updateNews()
  }

  handlePrvClick= async ()=>{
    this.setState({page: this.state.page-1})
    this.updateNews()
  }

  handleNextClick= async ()=>{
  this.setState({page: this.state.page+1})
  this.updateNews()
  }


  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines from {this.capitalize(this.props.category)} Category</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem 
            title={element.title?element.title.slice(0,44):""} 
            description={element.description?element.description.slice(0,88):""} 
            newsUrl={element.url} 
            imageUrl={element.urlToImage} 
            author={element.author} 
            date={element.publishedAt}  
            source={element.source.name}
            />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrvClick}>&laquo; Previous</button>
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    ); 
  }
}

export default News;
