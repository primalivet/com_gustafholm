import { printArticleReadTime } from './modules/read-time.js'

const main = () => {
  const articles = document.querySelectorAll('article')

  if (articles) {
    articles.forEach(printArticleReadTime)
  }
}

main()
