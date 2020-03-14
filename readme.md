> Human-friendly typed HTTP request library for Node.js or JS Client

# Install

```
$ npm install easy-fetch
 or
$ yarn add easy-fetch
```

## Usage

### - No gen. types and no parsing

```js
import fetch from "easy-fetch"

const res = await fetch("https://api.chucknorris.io/jokes/random")

console.log(res) // Normal fetch Response, res: Response | null
```

### - Callback with no gen. types

```js
import fetch from "easy-fetch"

// const res: any | null
const res = await fetch(
  "https://api.chucknorris.io/jokes/random",
  ({ parsedAPIResponse }) => parsedAPIResponse
)
console.log(res) // Parsed response ( body.json() )
```

### - Callback with gen. types

```ts
import fetch from "easy-fetch"

type APIResponse = {
  categories: any[]
  created_at: string
  icon_url: string
  id: string
  updated_at: string
  url: string
  value: string
}

const res = await fetch<string, APIResponse>(
  "https://api.chucknorris.io/jokes/random",
  // parsedAPIResponse: as APIResponse
  ({ parsedAPIResponse }) => parsedAPIResponse.value // ... fetch<string, ... >
)
console.log(res) // res: string | null

// OR

const res = await fetch<APIResponse, APIResponse>(
  "https://api.chucknorris.io/jokes/random",
  // parsedAPIResponse: as APIResponse
  ({ parsedAPIResponse }) => parsedAPIResponse // ... fetch<APIResponse, ... >
)
console.log(res) // res: APIResponse | null
```

## Maintainer

| [![Radovan Pelka (Rado)](https://github.com/RadovanPelka.png?size=100)](https://github.com/RadovanPelka) |
| -------------------------------------------------------------------------------------------------------- |


| [Radovan Pelka](https://github.com/RadovanPelka)
