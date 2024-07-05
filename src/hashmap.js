import LinkedList from "@kago_m/linked_list";

class Hashmap {
    constructor() {
        this.loadFactor = 0.85;
        // The length is the technical length of the array which we formally will expand to prevent out of bounds index access not based on determined length
        this.maxLength = 8;
        this.size = 0;
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

    // We do not use the key to find the value but rather the index within our limited buckets to find the values (key - value pairs ARE the values inside a linked list)
    set(key, value) {
        let deterministicCode = this.hash(key);
        let bucketEntry = this.bucketsArr[deterministicCode];
        let nodeValue = { key, value };
        if (bucketEntry === undefined) {
            let list = new LinkedList();
            list.append(nodeValue);
            this.bucketsArr[deterministicCode] = list.head;
            this.size++;
            return;
        } 
        
        // Collision occured so traverse linked list in search of matching key for same code else append
        let curr = this.bucketsArr[deterministicCode];
        while (curr !== null) {
            if (curr.value.key === key) {
                curr.value.value = value;
                return;
            }
            curr = curr.next;
        }
        
        // Append with method available of linked list at this array position
        this.bucketsArr[deterministicCode].append(nodeValue);
        this.size++;
        if (this.bucketsArr.length >= this.loadFactor * this.maxLength) {
            this.maxLength *= 2;
        }
    }

    get(key) {
        let deterministicCode = this.hash(key);
        let bucketEntry = this.bucketsArr[deterministicCode];
        // Key does not exist
        if (bucketEntry === undefined) return null;
        
        // Key exists
        let curr = this.bucketsArr[deterministicCode];
        while (curr !== null) {
            if (curr.value.key === key) return curr.value;

            curr = curr.next;
        } 

        return null;
    }

    has(key) {
        return !!this.get(key);
    }

    remove(key) {
        let deterministicCode = this.hash(key);
        let bucketEntry = this.bucketsArr[deterministicCode];
        // Key does not exist
        if (bucketEntry === undefined) return false;

        // Key exists
        let curr = this.bucketsArr[deterministicCode];
        let prev;
        while (curr !== null) {
            if (curr.value.key === key) {
                // Still at head so no prev exists
                if (prev === undefined) {
                    this.bucketsArr[deterministicCode] = this.bucketsArr[deterministicCode].next === null ? undefined : this.bucketsArr[deterministicCode].next;
                } else {
                    prev.next = curr.next;
                }

                return true;
            };

            curr = curr.next;
            prev = curr;
        } 

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        for (let i = 0; i < this.maxLength; i++) {
            this.bucketsArr[i] = undefined; 
        }
    }

    keys() {
        let keysList = [];
        for (let i = 0; i < this.maxLength; i++) {
            if (this.bucketsArr[i]) {
                keysList.append(this.bucketsArr[i].key);
            }

            let curr = this.bucketsArr[i].next;
            while (curr != null) {
                keysList.append(curr.key);
                curr = curr.next;
            }
        }

        return keysList;
    }

    values() {
        let valuesList = [];
        for (let i = 0; i < this.maxLength; i++) {
            if (this.bucketsArr[i]) {
                valuesList.append(this.bucketsArr[i].value);
            }

            let curr = this.bucketsArr[i].next;
            while (curr != null) {
                valuesList.append(curr.value);
                curr = curr.next;
            }
        }

        return valuesList;
    }

    entries() {
        let entriesList = [];
        for (let i = 0; i < this.maxLength; i++) {
            if (this.bucketsArr[i]) {
                entriesList.append(`[${this.bucketsArr[i].key} , ${this.bucketsArr[i].value}]`);
            }

            let curr = this.bucketsArr[i].next;
            while (curr != null) {
                entriesList.append(`[${curr.key} , ${curr.value}]`);
                curr = curr.next;
            }
        }

        return entriesList;
    }
}

export default Hashmap;