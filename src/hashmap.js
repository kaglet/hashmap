import LinkedList from "@kago_m/linked_list";

class Hashmap {
    constructor() {
        this.loadFactor = 0.85;
        // The length is the technical length of the array which we formally will expand to prevent out of bounds index access not based on determined length
        this.maxLength = 8;
        this.bucketsArr = [];
    }

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
        let indexCode = this.hash(key);
        let bucketEntry = this.bucketsArr[indexCode];
        let nodeValue = { key, value };
        if (bucketEntry === undefined) {
            let list = new LinkedList();
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

export default Hashmap;