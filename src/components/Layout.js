import React from "react"
import { Link } from "gatsby"
import Footer from "./Footer"
import "../assets/App.css"
const Layout = ({ children }) => (
  <>
    <header className="headerApp"
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            TensorFlow introduction
          </Link>
        </h1>
      </div>
    </header>

    <main className="HomeWorkApp">{children}</main>
    <Footer />
  </>
)

export default Layout
