import React from "react"
import Footer from '../components/Footer'
import '../assets/dogs.css'

export default () => {
  return (
    <div className="dogApp">
      <h1>Cats and Dogs implementation</h1>
      <article>
          As the dataset is extremely big or something else wrong with the package.
          When the build process begins it will blow up Node/Gatsby. 
          I suspect that during the page generation it will try and run the code even if it's only meant to run in the browser.
          Tried it by lazy loading it with react loadable. Also tried it by tweaking the webpack to avoid loading the package alltogether. Same result.
          The code had to be put in a Codesandbox to work. The code used is in the repo under DogsNCats folder.
          
      </article>
      <div>
      <iframe
        src="https://codesandbox.io/embed/reverent-star-ew9th?fontsize=14&hidenavigation=1&theme=dark"
        style={{
            width:'100%',
            height:'500px',
            border:'0',
            borderRadius: '4px',
            overflow:'hidden'
        }}
        title="reverent-star-ew9th"
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
      </div>
      
      <Footer/>
    </div>
  )
}