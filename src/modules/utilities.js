export const compose = (...fs) => x => fs.reduceRight((y, f) => f(y), x)

export const curry = f => (...xs) => {
  const arity = f.length
  if (xs.length < arity) {
    return (...ys) => curry(f)(...xs, ...ys)
  } else {
    return f(...xs)
  }
}

export const trace = l => x => {
  console.log(`l: ${x}`)
  return x
}
