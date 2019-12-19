import React from "react"
import Loadable from 'react-loadable';
import Footer from '../components/Footer'
import '../assets/dogs.css'
const loadingComponent=()=><div>Loading the cats and dogs list</div>
const LazyDogs= Loadable({
  loader:()=>import('../components/DogsNCats/dog-cat-list'),
  loading:loadingComponent
})
export default () => {
  
  return (
    <div className="dogApp">
      <h1>Cats and Dogs implementation</h1>
      <div className="listofDogs">
        <LazyDogs/>
      </div>
      <Footer/>
    </div>
  )
}