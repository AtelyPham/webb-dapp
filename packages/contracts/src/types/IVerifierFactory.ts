/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';

import { IVerifier } from './IVerifier';

export class IVerifierFactory {
  static connect(address: string, signerOrProvider: Signer | Provider): IVerifier {
    return new Contract(address, _abi, signerOrProvider) as IVerifier;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_proof',
        type: 'bytes',
      },
      {
        internalType: 'uint256[6]',
        name: '_input',
        type: 'uint256[6]',
      },
    ],
    name: 'verifyProof',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
