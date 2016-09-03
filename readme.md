>This *only* includes a JSX Transform; No ES2015, No React or ReactDOM.

>For a single script solution that includes React and ReactDOM in addition to this JSX Transform, checkout [react-towel](https://github.com/danmartinez101/react-towel)


# Throw in the Towel

**Description**:  In the early days of React, there was JSXTransformer.js to make it dead simple to use JSX in the browser without needing a build step. It wasn't, and still isn't a great idea to do the transform in the browser, but it made it super easy to get things rolling.

JSXTransformer was deprecated in favor of using Babel's browser build and that worked up until Babel 6 when the browser build was also deprecated.

That is where Throw in the Towel joins the show. It is basically just what you got from JSXTransformer or Babel 5. It still isn't a great idea to use for production, but it'll let you write JSX without a build step... so it's at least good for something. maybe.

**Status**:  Good enough for prototyping.

## Usage
This library is not intended to be used via npm with webpack/browserify/etc.

It is actually intended to be the polar opposite:

1. Reference the script from a cdn
2. Start writing code in `<script type="text/babel"></script>` tags
3. Or `<script type="text/babel" src="./external.js"></script>`

At some point you'll want to remove this script and set up a proper build process.

```es6
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="https://unpkg.com/throw-in-the-towel@2" charset="utf-8"></script>
    <script src="https://unpkg.com/react@0.14.2/dist/react.js" charset="utf-8"></script>
    <script src="https://unpkg.com/react-dom@0.14.2/dist/react-dom.js" charset="utf-8"></script>
    <script type="text/babel">
    function Winner() {
      return <h1>Winning?</h1>
    }
    ReactDOM.render(
      <Winner />,
      document.getElementById('root')
    )
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

Thanks to @Daniel15 for getting babel-standalone working.
