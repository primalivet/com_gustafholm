import { compose } from './utilities'
import {
  createElement,
  setInnerHTML,
  setAttributes,
  appendElement
} from './dom'

export const countWords = s => s.split(/\s/g).length

export const calcReadTime = wordsPerMin => nrOfWords => nrOfWords / wordsPerMin

export const roundFloat = float => Math.round(float * 100) / 100

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
  const wc = a.querySelector('.word-count').textContent.split(' ')[2]

  if (!isNaN(Number(wc))) {
    const rt = getReadTimeFromWordCount(wc)
    const t = a.querySelector('.meta')

    compose(
      appendElement(t),
      setInnerHTML(`&middot; ${rt} minute read`),
      setAttributes({ class: 'word-count upper bold dimmed' }),
      createElement
    )('span')
  }
}
