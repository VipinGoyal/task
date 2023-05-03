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
