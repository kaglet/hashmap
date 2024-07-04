/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/@kago_m/linked_list/src/node.js
class Node {
    constructor() {
        this.value = null;
        this.next = null;
    }
}

/* harmony default export */ const node = (Node);
;// CONCATENATED MODULE: ./node_modules/@kago_m/linked_list/src/linked_list.js


class LinkedList {
    constructor() {
        this._size = 0;
        this._head = null;
    }

    at(index) {
        let curr = this._head; 
        let i = 0;

        while (curr !== null && i < index) {
            curr = curr.next;
            i++;
        }
        console.log("last index item is", curr);
        return curr;
    }

    append(value) {
        let lastNode = this.at(this._size - 1);
        let newNode = new node();
        newNode.value = value;

        if (lastNode === null) {
            lastNode = newNode;
            this._head = lastNode;
        } else {
            lastNode.next = newNode;
        }

        this._size++;

        return this;
    }

    prepend(value) {
        let newHead = new node();
        newHead.value = value;

        if (this._head === null) {
            this._head = newHead;
        } else {
            // swop existing nodes
            let oldHead = this._head;
            this._head = newHead;
            newHead.next = oldHead;
        }

        this._size++;

        return this;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get head() {
        return this._head;
    }

    set head(value) {
        this._head = value;
    }

    tail() {
        return this.at(this._size - 1);
    }

    pop() {
        let curr = this._head;

        while(curr.next !== null) {
            curr = curr.next;
        }

        let lastNode = curr.next;
        curr.next = null;

        this._size--;

        return lastNode;
    }

    popFront() {
        let curr = this._head;
        this.head = curr.next;
        curr.next = null;
    }

    contains(value) {
        let found = false;
        let curr = this._head;

        while(found !== true && curr !== null) {
            if (curr.value === value) {
                return true;                
            }
            curr = curr.next;
        }

        return false;
    }

    find(value) {
        let found = false;
        let curr = this._head;
        let counter = 0;

        while(found !== true && curr !== null) {
            if (curr.value === value || JSON.stringify(curr.value) === JSON.stringify(value)) {
                return counter;                
            } 
            curr = curr.next;
            counter++;
        }

        return -1;
    }

    toString() {
        let curr = this._head;
        let stringFormat = ``;
        
        while (curr !== null) {
            if (curr.next === null) {
                stringFormat += `(  ${curr.value} )`; 
            } else {
                stringFormat += `(  ${curr.value} ) -> `; 
            }
            curr = curr.next;
        }

        return stringFormat; 
    }

    insertAt(index, value) {
        if (index === 0) {
            this.prepend(value);
            return;
        } else if (index === this.size - 1) {
            this.append(value);
            return;
        }

        let prevNode = this.at(index - 1);
        let oldNode = prevNode.next;
        let newNode = new node();
        newNode.value = value;

        prevNode.next = newNode;
        newNode.next = oldNode;
    }

    removeAt(index) {
        if (index === 0) {
            this.popFront();
            return;
        }
        let prevNode = this.at(index - 1);
        let oldNode = prevNode.next;

        prevNode.next = oldNode.next;
    }

    editAt(index, value) {
        let node = this.at(index);
        node.value = value;
    }
}

/* harmony default export */ const linked_list = (LinkedList);
;// CONCATENATED MODULE: ./node_modules/@kago_m/linked_list/src/index.js


/* harmony default export */ const src = (linked_list);



;// CONCATENATED MODULE: ./src/hashmap.js


class Hashmap {
    constructor() {
        this.loadFactor = 0.85;
        // The length is the technical length of the array which we formally will expand to prevent out of bounds index access not based on determined length
        this.maxLength = 8;
        this.bucketsArr = [];
    }

    // Used internally when setting or adding a new key
    hash(key) {
        if (typeof key !== "string") throw new Error("Trying to access index out of bound");

        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.maxLength;
        }
     
        return hashCode;
    } 

    set(key, value) {
        // We do not use the key to find the value but rather the index within our limited buckets to find the values (key - value pairs ARE the values inside a linked list)
        let deterministicCode = this.hash(key);
        let bucketEntry = this.bucketsArr[deterministicCode];
        let nodeValue = { key, value };
        if (bucketEntry === undefined) {
            let list = new src();
            list.append(nodeValue);
            bucketEntry = list;
        } else if(bucketEntry.find(nodeValue) > -1) {
            let matchedKeyIndex = bucketEntry;
            bucketEntry.editAt(matchedKeyIndex, value)
        } else {
            bucketEntry.append(nodeValue);
            if (this.bucketsArr.length >= this.loadFactor * this.maxLength) {
                this.maxLength *= 2;
            }
        }
    }
}

/* harmony default export */ const hashmap = (Hashmap);
;// CONCATENATED MODULE: ./src/index.js


let map = new hashmap();

map.set("kago", "lizards");
map.set("lizzie", "alligators");
map.set("ogak", "wizards");

console.log(map);
/******/ })()
;