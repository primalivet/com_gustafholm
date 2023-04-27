---
title: 'Reduce, Filter and Map without Reduce Filter and Map'
publishdate: 2017-06-19T12:29:33.003Z
image: reduce-filter-map.gif
draft: false
---
Write your own Reduce, Filter and Map without using the built in `reduce()`, `filter()` and `map()`.

A good way to understand what’s going on inside the functional programming must-know-functions is to rewrite them. So as a personal refresher I thought I would share how I implemented `reduce()`, `filter()` and `map()`. Without any of the ES6 stuff. And non of the ES7 stuff either 😏.

## A Simple Map

Then `.map()` method on `Array` runs every item in an array through a given callback function and returns a new array with the same length as the one the method called on.

The simplest version of `map()` I could think of looks like this.

```js
function map(array, cb) {
  const result = [];
  for (let i = 0; i < array.length; i += 1 {      
    result.push(cb(array[i]));
  }
  return result;
}
```

Very straight forward here.

1. `map()` takes an `array` and a callback function `cb` as arguments.
2. Declares an empty `result` array for storing the mapped items.
3. Loops all the items in the `array`.
4. Run the callback on the current item `cb(array[i])`.
5. Push the return value of the callback function into `result.push(...)`.
6. Return the `result` when the loop is done.

Run it

```js
map([1, 2, 3, 4, 5], item => item + 1); // [2, 3, 4, 5, 6]
```

## A Simple Filter

The `.filter()` method on `Array` also runs every item in a given array against a callback function. However, the callback function should always evaluate to a Boolean. So basically it has to return `true` or `false`. The items that pass the callback evaluation are returned in a new array.

The implementation of `filter()` is almost the same thing as `map()`.

```js
function filter(array, cb) {
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    if (cb(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}
```

The difference here, in comparison to `map()` is that the callback function `cb` has to evaluate to `true` or `false`. So inside the for loop, we call our callback with the current array item `cb(array[i])` inside the if statement. If it evaluates to true , `.push` that sucker into the results array. When done, return the `result`.

Call it.

```js
filter([1, 2, 3, 4, 5], item => item >= 3); // [3, 4, 5]
```

## And a Simple Reduce

The `.reduce()` method is the `Array` multi tool and can be used in lots of scenarios. However, the fundamental functionality of `reduce()` is quite straight forward. The function takes tree arguments. An `array` to iterate upon. A callback function `cb` to run every item in the array through and an `initialValue` which you can think of as the container and the starting point for your callback `cb` results. If you want a string back pass in an empty string `''`, if you want an array pass an empty array `[]` and so one. Your `initialValue` dosen’t have to empty though. The type of `initialValue` is mostly dependent on what result your callback returns.

Being the multi tool, you might think the implementation is very different from `filter()` and `map()`. But it’s not. Along with the `array` and `cb` arguments I also pass the `initialValue`.

```js
function reduce(array, cb, initialValue) {
  let result = initialValue;
  for (let i = 0; i < array.length; i += 1) {
    result = cb.call(undefined, result, array[i], i, array);
  }
  return result;
}
```

You’ve probably figured it all out already. But I’ll run through it anyway.

1. `reduce()` takes an array array and a callback function `cb`. Just like our `filter()` and `map()`. It also takes an `initialValue`, as I wrote, you can think of this as the container you want to receive as the return value of your `reduce()`. The `initialValue` is tightly coupled with how your callback `cb` works.
2. Declare a `result` variable and point it to your `initialValue`, this is just a reference for readability.
3. Loops all the items in the `array`.
4. Inside the loop, assign the return value of your callback to the `result`. Call the callback and set `this` to `undefined` and pass the `result` the current array item `array[i]`, the loop iterator `i` and the whole `array`. The last to isn’t really needed in this example but I’ve found it good practice to pass all the values. Since we are reassigning `result` on every loop iteration it’s crucial that your callback returns the entire result and not just the current item. I’m using `.call` on the `cb` function since I want to set `this` to `undefined` inside the callback.
5. When done, retuuuurn result!

Here’s how to call it.

```js
reduce([1, 2, 3, 4, 5], (result, item) => {
  result.push(item * 2);
  return result;
}, []); // [ 2, 4, 6, 8, 10 ]
```

And here’s the same call but where I’ve broken out the callback for some clarity.

```js
const cb = (result, item) => {
  result.push(item * 2);
  return result;
};
reduce([1, 2, 3, 4, 5], cb, []); // [ 2, 4, 6, 8, 10 ]
```

## Use Reduce to Create Map and Filter 😲

Since `reduce()` is so flexible, you can use it to create your own `map()` and `filter()`. The key is, as you might figured out already, to switch the for loop out and replace it with `reduce`. Go ahead and try building them yourself before checking them out below.

### Map with Reduce

```js
function map(array, func) {
  return reduce(array, function (result, item) {
    result.push(func(item));
    return result;
  }, []);
}
```

I’m sure you can figure out what changed yourself, it works the same as our first `map()`. But now using `reduce()` internally. The main difference is that I wrapped a `reduce()` call inside of a `map()` function. To state the obvious this is a new `map()` function. It replaces the one I wrote from scratch above.

Call it the same way as before.

```js
map([1, 2, 3, 4, 5], item => item + 1) // [ 2, 3, 4, 5, 6 ]
```

Here’s a more modern version with arrow functions, implicit return and `.concat()`.

```js
const map = (array, func) =>
  reduce(array, (result, item) =>
    result.concat(func(item)), []);
```

### Filter with Reduce

```js
function filter(array, func) {
  return reduce(array, function (result, item) {
    if (func(item)) {
      result.push(item);
      return result;
    }
    return result;
  }, []);
}
```

This one you can figure out yourself, so I’ll leave you to it. It’s kind of the same changes as in the previous `map()` with `reduce()`. Also call this the same way as we called our first `filter()`.

```js
filter([1, 2, 3, 4, 5], item => item >= 3); // [ 3, 4, 5 ]
```

And a more modern version of this can look like.

```js
const filter = (array, func) =>
  reduce(array, (result, item) =>
    func(item) ? result.concat(item) : result, []);
```

### Also, a modern version of Reduce

The only things I did here was switching the declaration to a functional expression using a arrow function and replaced the for loop with the `.forEach()` method. Very basic.

```js
const reduce = (array, cb, initialValue) => {
  let result = initialValue;
  array.forEach(item =>
    result = cb.call(undefined, result, item, array));
  return result;
};
```

Hope you learned something. I sure was a good refresher for myself. Take care! 👋
