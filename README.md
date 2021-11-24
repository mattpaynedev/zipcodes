# ZipCodes API:

A web API to manage a list of ZIP codes. 

---

### Usage:

To run the server, you must have Node.js installed on your machine. To run:

```
$ git clone https://github.com/mattpaynedev/zipcodes.git
$ cd zipcodes
$ node server.js
```

The default port is `3001` on localhost. If you need to install any dependencies, run `$ npm install`.

### Endpoints:

`.../insert/[number]`

Inserts a ZIP code into the list. 
Returns a JSON object with an `inserted` field (for successful inserts) or an `error` field (for unsuccessful inserts).


`.../delete/[number]`

Deletes a ZIP code from the list. 
Returns a JSON object with a `deleted` field (for successful deletions) or an `error` field (for unsuccessful deletions).


`.../has/[number]`

Checks if a ZIP code exists in the list. 
Returns a JSON object with a boolean formatted as `{[number]: true/false}`.


`.../display`

Displays all of the ZIP codes in the list. 
If there are successive numbers (e.g., `10034, 10035, 10036`) they will be displayed as a range (`10034-10036`).
For ZIP codes with leading zeros, the leading zeros will be included in the response (e.g., `7093` becomes `07093`).
Returns a JSON object with an array containing stringified values for each number in the list.
