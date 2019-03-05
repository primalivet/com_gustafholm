const compose = (...fs) => x => 
  fs.reduceRight((y, f) => f(y), x)

const countWords = text => 
  text.split(/\s/g).length

const calcReadTime = wordsPerMin => nrOfWords => 
  nrOfWords /  wordsPerMin;

const roundFloat = float =>
  Math.round(float * 100) / 100;

const getReadTime = compose(roundFloat, calcReadTime(200), countWords)

const createElement = type => attrs => content => {
  const e = document.createElement(type)

  Object.keys(attrs).forEach(key => {
    e.setAttribute(key, attrs[key])
  })
  
  e.innerHTML = content

  return e
}

const prependElement = parent => element => document.querySelector(parent).prepend(element)

const appendElement = parent => element => document.querySelector(parent).append(element)

const replaceElement = target => newElement => {
  const  oldElement = document.querySelector(target)
  oldElement.parentNode.replaceChild(newElement, oldElement)
}

/**
 * Flow
 */


if (document.body.classList.contains('page')) {
  const page = document.body.innerHTML
  const readTime = getReadTime(page)

  const insertReadTime = compose(appendElement('.meta'), createElement('span')({ class: 'label dimmed' }))

  insertReadTime(` &middot; ${readTime} minute read`)
}
