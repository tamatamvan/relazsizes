import React, { Component } from 'react'

import { string, arrayOf, shape, oneOfType, oneOf } from 'prop-types'

const DOMisAvailable = window &&
  window.document &&
  window.document.createElement

if (DOMisAvailable) {
  !window.lazySizes && require('lazysizes')
}

class Relazsizes extends Component {
  handleSrcset = (el, dataSrcset) => {
    if (el === 'img' && typeof(dataSrcset) === "object") {
      return dataSrcset.reduce((acc, val, idx, data) => (
        `${acc}${val.srcset} ${val.variant}${idx+1 < data.length ? ', ' : ''}`
      ), '')
    }
    if (el === 'picture' && typeof(data)) {
      return dataSrcset.split(/,.| \w+\, | \w+/)
        .map(srcset => ({
          srcset
        }))
        .filter(Boolean)
    }
    return dataSrcset
  }

  render () {
    const {
      alt,
      className,
      dataSrc,
      dataSrcset,
      el,
      src,
      ...otherProps
    } = this.props
    const srcSet = dataSrcset && this.handleSrcset(dataSrcset)
    
    return (
      <>
        {{
          picture: (
            <picture>
              {
                srcSet && srcSet.map(val => (
                  <source data-srcset={val.srcset} media={val.media} type={val.type}/>
                ))
              }
              <img
                src={src}
                data-src={dataSrc}
                className={`lazyload ${className ? className : ''}`}
                alt={alt}
                {...otherProps}
              />
            </picture>
          ),
          img: (
            <img
              src={src}
              data-src={dataSrc}
              data-srcset={srcSet}
              className={`lazyload ${className ? className : ''}`}
              alt={alt}
              {...otherProps}
            />
          ),
          iframe: (
            <iframe />
          )
        }[el]}
      </>
    )
  }
}

const srcSetItem = shape({
  media: string,
  srcset: string.isRequired,
  type: string,
  variant: string,
})

Relazsizes.propTypes = {
  alt: string,
  className: string,
  dataSrc: string.isRequired,
  dataSrcset: oneOfType([
    arrayOf(srcSetItem),
    string
  ]),
  el: oneOf([
    'img',
    'picture',
    'iframe'
  ]),
  src: string,
}

Relazsizes.defaultProps = {
  src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  el: 'img'
}

export default Relazsizes
