import React, { Component } from 'react'

import { string, arrayOf, shape, oneOfType, oneOf } from 'prop-types'

const isSameObj = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)

  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }

  for (var i = 0; i < obj1Keys.length; i++) {
    var propName = obj1Keys[i]

    if (obj1[propName] !== obj2[propName]) {
      return false
    }
  }
  return true
}

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
  constructor(props) {
    super(props)
    this.imgRef = React.createRef()
  }

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

  componentDidUpdate (prevProps) {
    const propChanged = !isSameObj(prevProps, this.props)
    const lazysizesAvailable = DOMisAvailable && window.lazySizes

    if(propChanged && lazysizesAvailable) {
      const el = this.imgRef.current
      if (lazySizes.hC(el, 'lazyloaded')) {
        lazySizes.rC(el, 'lazyloaded')
      }
      if (!lazySizes.hC(el, 'lazyload')) {
        lazySizes.aC(el, 'lazyload')
      }
    }
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
                ref={this.imgRef}
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
              ref={this.imgRef}
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
              ref={this.imgRef}
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
