import React, { Component } from 'react'

import { string, array, object, oneOfType } from 'prop-types'

const DOMisAvailable = window &&
  window.document &&
  window.document.createElement

if (DOMisAvailable) {
  !window.lazySizes && require('lazysizes')
}

class Relazsizes extends Component {
  render () {
    const {
      alt,
      className,
      dataSrc,
      dataSrcset,
      src,
      ...otherProps
    } = this.props

    return (
      <img
        src={src}
        data-src={dataSrc}
        data-srcset={dataSrcset}
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
  dataSrc: string.isRequired,
  dataSrcset: oneOfType([
    array,
    object,
    string
  ]),
  src: string,
}

Relazsizes.defaultProps = {
  src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
}

export default Relazsizes
