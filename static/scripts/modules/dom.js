export const isElement = x => x instanceof Element

export const createElement = t => {
  const e = document.createElement(t)

  return e
}

export const setInnerHTML = c => e => {
  e.innerHTML = c

  return e
}

export const setAttributes = as => e => {
  Object.keys(as).forEach(k => {
    e.setAttribute(k, as[k])
  })

  return e
}

export const prependElement = t => e => {
  if (!isElement(t)) {
    t = document.querySelector(t)
  }

  t.prepend(e)
}

export const appendElement = t => e => {
  if (!isElement(t)) {
    t = document.querySelector(t)
  }

  t.append(e)
}

export const replaceElement = t => newE => {
  if (!isElement(newE)) return

  if (!isElement(t)) {
    t = document.querySelector(t)
  }

  t.parentNode.replaceChild(newE, t)
}
