import React, { Component } from 'react'

import { string, arrayOf, shape, oneOfType, oneOf } from 'prop-types'

// update for SSR
const DOMisAvailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

if (DOMisAvailable) {
  !window.lazySizes && require('lazysizes')
}

class Relazsizes extends Component {
  handleSrcset = (el, dataSrcset) => {
    if (el === 'img' && typeof(dataSrcset) === 'object') {
      return dataSrcset.reduce((acc, val, idx, data) => (
        `${acc}${val.srcset} ${val.variant}${idx+1 < data.length ? ', ' : ''}`
      ), '')
    }
    if (el === 'picture' && typeof(data) === 'string') {
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
      dataSizes,
      dataSrc,
      dataSrcset,
      el,
      src,
      ...otherProps
    } = this.props
    const srcSet = dataSrcset && this.handleSrcset(el, dataSrcset)
    const classNameVal = `lazyload ${className ? className : ''}`
    
    return (
      <>
        {{
          picture: (
            <picture>
              {
                (srcSet && el === 'picture') && srcSet.map((val, idx) => (
                  <source data-srcset={val.srcset} media={val.media} type={val.type} key={`src-${idx}`}/>
                ))
              }
              <img
                src={src}
                data-src={dataSrc}
                className={classNameVal}
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
              data-sizes={dataSizes}
              className={classNameVal}
              alt={alt}
              {...otherProps}
            />
          ),
          iframe: (
            <iframe
              data-src={dataSrc}
              className={classNameVal}
              {...otherProps}
            />
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
  dataSizes: string,
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
