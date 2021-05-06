import { compose, divide, multiply, ceil, round } from './utilities.js'
import { createElement, setInnerHTML, setAttributes, appendElement } from './dom.js'

export const countWords = s => s.split(/\s/g).length

export const calcReadTime = wordsPerMin => nrOfWords => nrOfWords / wordsPerMin

export const roundFloat = compose(
  ceil,
  round, 
  divide(100), 
  multiply(100)
)

export const getReadTimeFromText = txt =>
  compose(
    roundFloat,
    calcReadTime(200),
    countWords
  )(txt)

export const getReadTimeFromWordCount = wc =>
  compose(
    roundFloat,
    calcReadTime(200)
  )(wc)

export const printArticleReadTime = a => {
  const wc = a.querySelector('[data-post-wcount]').textContent.split(' ')[2]

  if (!isNaN(Number(wc))) {
    const rt = getReadTimeFromWordCount(wc)
    const t = a.querySelector('[data-post-meta')

    compose(
      appendElement(t),
      setInnerHTML(`&middot; ${rt} minute read`),
      setAttributes({ class: 'upper bold dimmed' }),
      createElement
    )('span')
  }
}
