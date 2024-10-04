// Tiny Encryption Algorithm (TEA)
export function encryptTEA(data, key) {
    const v = new Uint32Array(2);
    v[0] = data.charCodeAt(0) | (data.charCodeAt(1) << 8) | (data.charCodeAt(2) << 16) | (data.charCodeAt(3) << 24);
    v[1] = data.charCodeAt(4) | (data.charCodeAt(5) << 8) | (data.charCodeAt(6) << 16) | (data.charCodeAt(7) << 24);
    const k = new Uint32Array(4);
    for (let i = 0; i < 4; i++) {
      k[i] = key.charCodeAt(i * 4) | (key.charCodeAt(i * 4 + 1) << 8) | (key.charCodeAt(i * 4 + 2) << 16) | (key.charCodeAt(i * 4 + 3) << 24);
    }
    let sum = 0;
    const delta = 0x9e3779b9;
    for (let i = 0; i < 32; i++) {
      sum += delta;
      v[0] += ((v[1] << 4) + k[0]) ^ (v[1] + sum) ^ ((v[1] >> 5) + k[1]);
      v[1] += ((v[0] << 4) + k[2]) ^ (v[0] + sum) ^ ((v[0] >> 5) + k[3]);
    }
    return v[0].toString(16) + v[1].toString(16);
  }
  
  export function decryptTEA(encryptedData, key) {
    const v = new Uint32Array(2);
    v[0] = parseInt(encryptedData.slice(0, 8), 16);
    v[1] = parseInt(encryptedData.slice(8, 16), 16);
    const k = new Uint32Array(4);
    for (let i = 0; i < 4; i++) {
      k[i] = key.charCodeAt(i * 4) | (key.charCodeAt(i * 4 + 1) << 8) | (key.charCodeAt(i * 4 + 2) << 16) | (key.charCodeAt(i * 4 + 3) << 24);
    }
    let sum = 0xc6ef3720;
    const delta = 0x9e3779b9;
    for (let i = 0; i < 32; i++) {
      v[1] -= ((v[0] << 4) + k[2]) ^ (v[0] + sum) ^ ((v[0] >> 5) + k[3]);
      v[0] -= ((v[1] << 4) + k[0]) ^ (v[1] + sum) ^ ((v[1] >> 5) + k[1]);
      sum -= delta;
    }
    const decrypted = String.fromCharCode(
      v[0] & 0xff,
      (v[0] >> 8) & 0xff,
      (v[0] >> 16) & 0xff,
      (v[0] >> 24) & 0xff,
      v[1] & 0xff,
      (v[1] >> 8) & 0xff,
      (v[1] >> 16) & 0xff,
      (v[1] >> 24) & 0xff
    );
    return decrypted;
  }
  