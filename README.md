# relazsizes

React wrapper component for [lazysizes](https://github.com/minhtranite/react-lazysizes) 💤🚀

Relazsizes is a component for using [lazysizes](https://github.com/minhtranite/react-lazysizes) library in your react application. You can use relazsizes for lazyload image assets in your web application with various strategies and also lazyload iframe to boost your React web app performance.

## Table of Contents
* [Demo](#Demo)
* [Instalation](#Instalation)
* [Usage](#Usage)
* [Props List & Types](#Props-List--Types)
* [Contribution ](#Contribution)

## Demo
If you're looking for a working demo, you can [click this link](https://relazsizes.firebaseapp.com).

## Instalation

```
npm install relazsizes

# or

yarn add relazsizes
```

## Usage

```javascript
import Relazsizes from 'relazsizes'

// simple image lazyload with lowres image as a placeholder
<Relazsizes
  src="/img/black-and-white-sm.jpg"
  dataSrc="/img/black-and-white.jpg"
  className="DemoContent-media"
  alt="Simple lazy load images"
/>

// simple image lazyload without placeholder
<Relazsizes
  src="/img/black-and-white-sm.jpg"
  dataSrc="/img/black-and-white.jpg"
  className="DemoContent-media"
  alt="Simple lazy load images"
/>

// lazyload images with picture element
const srcSet1 = [
  {
    media: '(min-width: 1600px)',
    srcset: '/img/light/light-lg.jpg'
  },
  {
    media: '(min-width: 800px)',
    srcset: '/img/light/light-md.jpg'
  }
]

<Relazsizes
  el="picture"
  dataSrcset={srcSet1}
  dataSrc="/img/light/light-sm.jpg"
  className="DemoContent-media"
  alt="lazy load images with picture tag"
/>

// lazyload with images and srcset attribute
const srcSet2 = `
  /img/cloud/cloud-hd.jpg 2x
`

<Relazsizes
  dataSizes="auto"
  dataSrcset={srcSet2}
  dataSrc="/img/cloud/cloud-lg.jpg"
  className="DemoContent-media"
  alt="Lazy load images with img srcset"
/>

// lazyload youtube embeded video with iframe
<Relazsizes
  el="iframe"
  height="700px"
  dataSrc="https://www.youtube.com/embed/LXb3EKWsInQ"
  className="DemoContent-media"
  frameborder="0"
  title="Costa Rica!"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
/>
```

## Props List & Types
| props | types | description | example | default |
|-------|-------|-------------|---------|---------|
| alt | string | Img Alternate text | `'Image Alt Text'` | |
| className | string | CSS class names | `'img img-responsive'` | |
| dataSrcset | array of srcSetItem or string | srcset attribute value if using `img`, and will be generated as `source` element if using `picture`. [Reference if using img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture), [Reference if using picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) | [see here]() | |
| dataSizes | string | img sizes attribute, [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Using_the_srcset_and_sizes_attributes) | `'(max-width: 600px) 200px, 50vw'` or `'auto'` | |
| dataSrc | string | the main image source that will be lazyloaded | `'/img/cloud-sd.jpg'` | |
| el | enum: 'img', 'picture', 'iframe' | type of html element to use | `picture` | `'img'` | 
| src | string | `'/img/filename-hd.jpg'` | the image placeholder | `'data:image/gif;base64,R0lGODlhA. . .''`|

### Value of dataSrcset
You can use `srcset` attribute when using `img` or `picture` element via `dataSrcset` prop. The type of the prop can be in a string or in an array of object shape defined as `srcSetItem`.
Passing `dataSrcset` as a string will work the best when you are using `img` el. While you are using `picture` element, it is strongly adviced to pass the value in array of `srcSetItem` instead.

Structure of `srcSetItem`:

| key | type | description | example |
|-----|------|-------------|---------|
| media | string | `media` attr value in `source` element inside of `picture` | `'(min-width: 800px)'` |
| srcset | string | `srcset` attr value in `source` element inside of `picture` | `'/img/filename-hd.jpg'` |
| type | string | `type` attr value in `source` element inside of `picture, type of the file | `'image/svg+xml'` |
| variant | string | this value will be used if array of `srcSetItem` is passed to `dataSrcset` prop while using `img` element. The value will be used as an descriptor | `'2x'`, `'600w'` |

Example given:
* In the script bellow we are passing value of `srcSet2` variable (which type is string) into `dataSrcset` prop.
```javascript
// lazyload with images and srcset attribute
const srcSet2 = `
  /img/cloud/cloud-hd.jpg 2x
`

<Relazsizes
  dataSizes="auto"
  dataSrcset={srcSet2}
  dataSrc="/img/cloud/cloud-lg.jpg"
  className="DemoContent-media"
  alt="Lazy load images with img srcset"
/>
```

The code above will be rendered in browser as:
```html
<img src="/img/cloud/cloud-lg.jpg"
  data-src="/img/cloud/cloud-lg.jpg"
  data-srcset="/img/cloud/cloud-hd.jpg 2x" 
  data-sizes="auto"
  class="DemoContent-media lazyautosizes lazyloaded"
  alt="Lazy load images with img srcset" sizes="1344px"
  srcset="/img/cloud/cloud-hd.jpg 2x">
```

* While in the example below, when using `picture` element, we can pass array of `srcSetItem` into the `dataSrcset` prop. Each item in the array will be rendered as `source` element inside the `picture`.

```javascript
// lazyload images with picture element
const srcSet1 = [
  {
    media: '(min-width: 1600px)',
    srcset: '/img/light/light-lg.jpg'
  },
  {
    media: '(min-width: 800px)',
    srcset: '/img/light/light-md.jpg'
  }
]

<Relazsizes
  el="picture"
  dataSrcset={srcSet1}
  dataSrc="/img/light/light-sm.jpg"
  className="DemoContent-media"
  alt="lazy load images with picture tag"
/>
```

The code above will be rendered in browser as:

```html
<picture>
  <source data-srcset="/img/light/light-lg.jpg" media="(min-width: 1600px)" srcset="/img/light/light-lg.jpg">
  <source data-srcset="/img/light/light-md.jpg" media="(min-width: 800px)" srcset="/img/light/light-md.jpg">
  <img src="/img/light/light-sm.jpg"
    data-src="/img/light/light-sm.jpg"
    class="DemoContent-media lazyloaded" 
    alt="lazy load images with picture tag">
</picture>
```

## Contribution 

Feedbacks and contributions are really welcomed! Feel free to make issues or pull requests to this repository. :pray:
