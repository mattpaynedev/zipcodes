# ZipCodes API:

A web API to manage a list of 5-digit ZIP codes. 

---

## Usage:

To run the server, you must have Node.js installed on your machine. To run:

```
$ git clone https://github.com/mattpaynedev/zipcodes.git
$ cd zipcodes
$ node server.js
```

The default port is `3001` on localhost. If you need to install any dependencies, run `$ npm install`.

## Endpoints:

`.../insert/[number]`

Inserts a ZIP code into the list. 
Returns a JSON object (see below).
<br />
<br />

`.../delete/[number]`

Deletes a ZIP code from the list. 
Returns a JSON object (see below).
<br />
<br />

`.../has/[number]`

Checks if a ZIP code exists in the list. 
Returns a JSON object (see below).
<br />
<br />

`.../display`

Displays all of the ZIP codes in the list. 
If there are successive numbers (e.g., `10034, 10035, 10036`) they will be displayed as a range (`10034-10036`).
For ZIP codes with leading zeros, the leading zeros will be included in the response (e.g., `7093` becomes `07093`).
Returns a JSON object (see below) with an array containing stringified values for each number in the list.
<br />
<br />

## Response Structure:
### For successful calls:
```
{
    "success": true,
    "message": "Zip Code inserted",
    "data": {
        "inserted": "10039"
    }
}
```
`data` field keys can be: `zipCodes`, `inserted`, `deleted`, or the lookup value (for `has` calls).

### For unsuccessful calls:
```
{
    "success": false,
    "message": "Invalid input"
}
```
`message` varies based on the error.

## Implementation
The ZIP codes are stored in a custom class, consisting of a doubly linked list and a JS object. The linked list handles the sorting while the JS object provides quick lookup times. The `has` and `delete` methods are O(1) time and `insert` and `display` are O(n). For `display`, successive numbers are grouped together in the resulting array. The groupings are genereated at the time of the `display` call.
