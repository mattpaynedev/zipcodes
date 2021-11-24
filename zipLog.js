exports.ZipLog = class ZipLog {
    constructor() {
        this.codes = {}
        this.listHead = null
        this.list = null
    }

    has(val) {
        return { [val]: this.codes[val] ? true : false }
    }

    display() {
        const arr = []
        let node = this.list
        while (node) {
            if (node.start === node.end) {
                arr.push(this._stringifyZip(node.start))
            } else {
                arr.push(this._stringifyZip(node.start) + "-" + this._stringifyZip(node.end))
            }
            node = node.next
        }
        return arr
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
            return { error: "Invalid input" }
        }

        if (this.codes[val]) {
            return { error: "Zip Code already exists in list" }
        }

        if (!this.list) {
            // insert into empty list
            const newNode = new ZipNode(val)
            this.list = newNode
            this.codes[val] = newNode
        } else {
            let node = this.list
            let prev = null
            while (node && node.start < val) {
                // find the insertion point
                prev = node
                node = node.next
            }
            if (!prev) {
                // insert at the beginning of the list
                if (node.start > val + 1) {
                    const newNode = new ZipNode(val)
                    this._insertNewNode(prev, node, newNode)
                    this.list = newNode
                    this.codes[val] = newNode
                } else {
                    node.start = val
                    this.codes[val] = node
                }
            } else if (!node) {
                // insert at the end of the list
                if (prev.end === val - 1) {
                    prev.end = val
                    this.codes[val] = prev
                } else {
                    const newNode = new ZipNode(val)
                    this._insertNewNode(prev, node, newNode)
                    this.codes[val] = newNode
                }
            } else if (node.start > val + 1 && prev.end < val - 1) {
                // insert a completely new node (no merges)
                const newNode = new ZipNode(val)
                this._insertNewNode(prev, node, newNode)
                this.codes[val] = newNode
            } else if (prev && prev.end === val - 1) {
                // merge with previous node
                prev.end = val
                if (node.start === val + 1) {
                    // merge with next node, if needed
                    prev.end = node.end
                    let n = node.start
                    while (n < node.end) {
                        this.codes[n] = prev
                        n++
                    }
                    if (node.next) node.next.prev = prev
                    prev.next = node.next
                }
                this.codes[val] = prev
            } else if (node.start === val + 1) {
                // merge with next node only
                node.start = val
                this.codes[val] = node
            }
        }
        return { inserted: this._stringifyZip(val) }
    }

    _insertNewNode(prev, node, newNode) {
        if (prev) prev.next = newNode
        newNode.prev = prev
        newNode.next = node
        if (node) node.prev = newNode
    }

    delete(val) {
        if (!this.codes[val]) {
            return { error: `Zip Code ${val} is not in the list.` }
        }

        const node = this.codes[val]
        if (node.start === val && node.end === val) {
            node.prev.next = node.next
            node.next.prev = node.prev
        } else if (node.start === val) {
            node.start = val + 1
        } else if (node.end === val) {
            node.end = val - 1
        } else {
            const newNode = new ZipNode(val + 1)
            newNode.end = node.end
            newNode.prev = node
            newNode.next = node.next
            let n = newNode.start
            while (n < newNode.end) {
                this.codes[n] = newNode
                n++
            }
            node.end = val - 1
            node.next = newNode
        }
        delete this.codes[val]
        return { deleted: val }
    }
}

class ZipNode {
    constructor(val, prev = null, next = null) {
        this.start = val
        this.end = val
        this.prev = prev
        this.next = next
    }
}