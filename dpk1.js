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
