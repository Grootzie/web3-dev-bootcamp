import { secp256k1 } from '@noble/curves/secp256k1';
import {toHex} from 'ethereum-cryptography/utils.js';

const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);
const publicKeyShort = publicKey.slice(1).slice(-20);

console.log(toHex(privateKey));
console.log(toHex(publicKeyShort));