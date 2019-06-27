import React, { Component } from 'react'

import { string, array, object, oneOfType } from 'prop-types'

const DOMisAvailable = window &&
  window.document &&
  window.document.createElement

if (DOMisAvailable) {
  require('lazysizes')
}

class Relazsizes extends Component {
  render () {
    const {
      alt,
      className,
      datasrc,
      datasrcset,
      src,
      ...otherProps
    } = this.props

    return (
      <img
        src={src}
        data-src={datasrc}
        data-srcset={datasrcset}
        className={`lazyload ${className ? className : ''}`}
        alt={alt}
        { ...otherProps }
      />
    )
  }
}

Relazsizes.propTypes = {
  alt: string,
  className: string,
  datasrc: string.isRequired,
  datasrcset: oneOfType([
    array,
    object,
    string
  ]),
  src: string,
}

export default Relazsizes
