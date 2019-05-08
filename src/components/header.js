import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerImage from "../../content/assets/shavonne_header.jpg"

console.log(headerImage)

const Header = ({ siteTitle, tagline }) => (
  <header>
    <Link to="/" style={{ textDecoration: `none`, }}>
      <div
        style={{
          backgroundImage: `url(${ headerImage })`,
          height: `214px`,
        }}
      />
      <div
        style={{
          backgroundImage: '-webkit-gradient( linear, left bottom, right bottom, color-stop(0, rgb(122,29,40)), color-stop(0.5, rgb(235,147,14)), color-stop(1, rgb(24,199,24)) )',
          height: `55px`,
          verticalAlign: `middle`,
          padding: `0 50px`,
          color: `#ddd`,
          textShadow: `1px 1px 0 #000`,
          fontSize: `48px`,
          lineHeight: `58px`,
          fontFamily: `gentium book basic`,
          fontWeight: `600`,
        }}
      >
        {siteTitle}
        <span
          style={{
            fontSize: `26px`,
            fontStyle: `italic`,
            marginLeft: `8px`,
          }}
        >
          {tagline}
        </span>
      </div>
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  tagline: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  tagline: ``,
}

export default Header
