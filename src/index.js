import './sass/index.scss'
import './sass/admin.scss'

import { printArticleReadTime } from './modules/read-time'

const main = () => {
  const articles = document.querySelectorAll('article')

  if (articles) {
    articles.forEach(printArticleReadTime)
  }
}

main()
