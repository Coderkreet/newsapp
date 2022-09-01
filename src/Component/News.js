import React, { useEffect , useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
const [articles,setAirticel] = useState([])
const [loading , SetLoading] = useState(true)
const [page,setPage] = useState(1)
const [totalResults,setTotalResult] = useState(0)

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const upadteNews=  async () =>  {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4cee1abb02194655a278b8f23bb5286c&page=${page}&pageSize=${props.pageSize}`
    SetLoading(true)
    let data = await fetch(url)
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
  
    
    setAirticel(parsedData.articles)
    setTotalResult(parsedData.totalResults)
    SetLoading(false)  
    props.setProgress(100);
  }

  
  useEffect(()=>{
  document.title = `${capitalizeFirstLetter(props.category)}-News-With-Kreet`

    upadteNews();

  }, [])
  // previousBtn = async () => {

  //   this.setState({
  //     page: this.state.page - 1
  //   })
  //   this.upadteNews();
  // }
  // nextBtn = async () => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {

  //     this.setState({ page: this.state.page + 1 })
  //     this.upadteNews();
  //   }
  // }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4cee1abb02194655a278b8f23bb5286c&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
  let data = await fetch(url)
  let parsedData = await data.json();
  setAirticel(articles.concat(parsedData.articles))
  setTotalResult(parsedData.totalResults)

  };

    return (
      <>
        <h2 className='text-center' style={{marginTop : '90px'}}>News With Kreet :- <span className="badge bg-danger">Top Headlines -{capitalizeFirstLetter(props.category)}</span></h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row my-5">
          {articles.map((ele) => {
            return <div className="col-md-4 my-3" key={ele.url}>
              <Newsitem title={ele.title} description={ele.description} imgUrl={ele.urlToImage} url={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" onClick={this.previousBtn} className="btn btn-danger"> &larr;Previous </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" onClick={this.nextBtn} className="btn btn-danger"> Next  &rarr;</button>
        </div> */}
      </>
   

    )
  
}

News.defautProps = {
  country: 'in',
  pageSize: 6,
  category: 'science'

}
 News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News



