/* 
1. Globals values should be moved to top of the file after depenedencies import.
2. If event partitionKey not exists, we are using stringify and assign it to candidate, and digest with hex paramter will return string so we can avoid and merge it when we are not stringify it
3. If event not exist, then candidate will not be assigned so we can move it to else block of top condition itself.
4. we can run test cases for both files by changing path in test file from dpk1 to dpk or vice versa and test cases are working fine.
5. we can have common utilty where we can pass hash and diget key to get hash accordingly using this utility
6. We can assign candidate TRIVIAL_PARTITION_KEY as default value to avoid another else condition
7. We can move length check condition in first condition block, but avoid just in case if someone change const TRIVIAL_PARTITION_KEY to more than 256 in size. 
*/


dpk1.js content 

```

const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const getDigest = (data, hashKey = "sha3-512", digestKey = 'hex') => {
    const cryptoHash = crypto.createHash(hashKey);
    return cryptoHash.update(data).digest(digestKey);
}

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (event.partitionKey) {
        const key = event.partitionKey;
        candidate = typeof key !== "string" ? JSON.stringify(key) : key;
    } else {
      const data = JSON.stringify(event);
      candidate = getDigest(data);
    }
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getDigest(candidate);
  }

  return candidate;
};

```

dpk.test.js content here

```
const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

const cryptoHash = crypto.createHash("sha3-512")

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal string 100 with stringify when given input as 100", () => {
    const key = 100;
    const event = {partitionKey:key};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(`${key}`);
  });

  it("Returns the literal string 100 with stringify when given input as `100`", () => {
    const key = "100";
    const event = {partitionKey:key};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(key);
  });

  it("Returns the proper hash when given input doesnt contain partition key and its length can go beyond 256", () => {
    var key = JSON.stringify({name:'test'});

    const hash = cryptoHash.update(key).digest("hex");

    const event = {name:'test'};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(hash);
  });

  it("Returns the proper hash with proper hash when given input has greater than 256 length of key", () => {
    var key = crypto.randomBytes(257).toString('hex');
    const hash = crypto.createHash("sha3-512").update(key).digest("hex");

    const event = {partitionKey:key};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(hash);
  });

});

```