class ZipNode {
    constructor(val, prev = null, next = null) {
        this.val = val
        this.prev = prev
        this.next = next
    }
}

exports.ZipLog = class ZipLog {
    constructor() {
        this.codes = {}
        this.list = null
    }

    has(val) {
        return {
            success: true,
            message: "Check if Zip Code exists",
            data: {
                [val]: this.codes[val] ? true : false
            }
        }
    }

    display() {
        const arr = []
        let node = this.list
        while (node) {
            const start = node.val
            while (node.next && node.next.val === node.val + 1) {
                node = node.next
            }
            const end = node.val
            arr.push(start === end
                ? this._stringifyZip(start)
                : this._stringifyZip(start) + "-" + this._stringifyZip(end)
            )
            node = node.next
        }
        return {
            success: true,
            message: "Display Zip Codes",
            data: {
                zipCodes: arr
            }
        }
    }

    _stringifyZip(val) {
        let str = String(val)
        let counter = 5 - str.length
        let leadingZeros = ""
        while (counter > 0) {
            leadingZeros += "0"
            counter--
        }
        return leadingZeros + str
    }

    insert(val) {
        if (val < 1 || val > 99999) {
            return {
                success: false,
                message: "Invalid input"
            }
        }

        if (this.codes[val]) {
            return {
                success: false,
                message: "Zip Code already exists in list"
            }
        }

        if (!this.list) {
            // insert into empty list
            const newNode = new ZipNode(val)
            this.list = newNode
            this.codes[val] = newNode
        } else {
            let node = this.list

            while (node.val < val && node.next) {
                // find the insertion point
                node = node.next
            }

            let prev
            if (node.val < val) {
                // insert at the end of the list
                prev = node
                node = node.next
            } else {
                // all other inserts
                prev = node.prev
            }

            const newNode = new ZipNode(val)
            if (prev) {
                // normal insert
                prev.next = newNode
            } else {
                // insert at the head of the list
                this.list = newNode
            }
            newNode.prev = prev
            newNode.next = node
            if (node) node.prev = newNode
            this.codes[val] = newNode
        }

        return {
            success: true,
            message: "Zip Code inserted",
            data: {
                inserted: this._stringifyZip(val)
            }
        }
    }

    delete(val) {
        if (!this.codes[val]) {
            return {
                success: false,
                message: `Zip Code ${val} is not in the list.`
            }
        }

        const node = this.codes[val]
        if (!node.prev) {
            // move the head pointer
            this.list = node.next
        } else {
            node.prev.next = node.next
        }
        if (node.next) node.next.prev = node.prev

        delete this.codes[val]
        return {
            success: true,
            message: "Zip Code deleted",
            data: {
                deleted: val
            }
        }
    }
}
