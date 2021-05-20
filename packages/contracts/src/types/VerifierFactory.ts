/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { Verifier } from "./Verifier";

export class VerifierFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<Verifier> {
    return super.deploy(overrides || {}) as Promise<Verifier>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Verifier {
    return super.attach(address) as Verifier;
  }
  connect(signer: Signer): VerifierFactory {
    return super.connect(signer) as VerifierFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Verifier {
    return new Contract(address, _abi, signerOrProvider) as Verifier;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "proof",
        type: "bytes"
      },
      {
        internalType: "uint256[6]",
        name: "inputs",
        type: "uint256[6]"
      }
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "r",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "a",
        type: "uint256[2]"
      },
      {
        internalType: "uint256[2][2]",
        name: "b",
        type: "uint256[2][2]"
      },
      {
        internalType: "uint256[2]",
        name: "c",
        type: "uint256[2]"
      },
      {
        internalType: "uint256[6]",
        name: "input",
        type: "uint256[6]"
      }
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "r",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611258806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063695ef6f91461003b578063f398789b146100be575b600080fd5b6100aa600480360360e081101561005157600080fd5b81019060208101813564010000000081111561006c57600080fd5b82018360208201111561007e57600080fd5b803590602001918460018302840111640100000000831117156100a057600080fd5b91935091506101ba565b604080519115158252519081900360200190f35b6100aa60048036036101c08110156100d557600080fd5b6040805180820182529183019291818301918390600290839083908082843760009201829052506040805180820190915293969594608081019493509150600290835b828210156101565760408051808201825290808402860190600290839083908082843760009201919091525050508152600190910190602001610118565b50506040805180820182529396959481810194935091506002908390839080828437600092019190915250506040805160c0818101909252929594938181019392509060069083908390808284376000920191909152509194506102d99350505050565b600080600080600087876101008110156101d357600080fd5b604080518082018252918301929181830191839060029083908390808284376000920191909152505060408051808201825292959493818101939250906002908390839080828437600092019190915250506040805180820182529295949381810193925090600290839083908082843760009201919091525050604080518082018252929594938181019392509060029083908390808284376000920191909152505060408051808201825288815260208101889052815160c0818101909352999d50979b509599509097506102cd968b96958995509093508d92506006915083908390808284376000920191909152506102d9915050565b98975050505050505050565b60006102e36110f7565b604080518082018252875181526020808901518183015290835281516080810183528751518184019081528851830151606083015281528251808401845288830180515182525183015181840152818301528382015281518083018352865181528682015181830152838301528151600680825260e082019093526000929091820160c08036833701905050905060005b60068110156103ad5784816006811061038957fe5b602002015182828151811061039a57fe5b6020908102919091010152600101610374565b506103b881836103d6565b6103c7576001925050506103ce565b6000925050505b949350505050565b60007f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018161040261059e565b9050806080015151855160010114610456576040805162461bcd60e51b81526020600482015260126024820152711d995c9a599a595c8b5898590b5a5b9c1d5d60721b604482015290519081900360640190fd5b604080518082019091526000808252602082018190525b8651811015610527578387828151811061048357fe5b6020026020010151106104dd576040805162461bcd60e51b815260206004820152601f60248201527f76657269666965722d6774652d736e61726b2d7363616c61722d6669656c6400604482015290519081900360640190fd5b61051d82610518856080015184600101815181106104f757fe5b60200260200101518a858151811061050b57fe5b6020026020010151610b57565b610bec565b915060010161046d565b5061054a81836080015160008151811061053d57fe5b6020026020010151610bec565b905061058061055c8660000151610c7d565b8660200151846000015185602001518587604001518b604001518960600151610d09565b6105905760019350505050610598565b600093505050505b92915050565b6105a6611129565b6040805180820182527f2b2f7b59700c793cc76ad3c725ecf758838aad94a0fd0243ea9bc6f8bd36e4d581527f22de0061ef1ed9c4458eac210482dbf6debbed8abe64ae40722b0d2dac621f586020808301919091529083528151608080820184527f2a266ba4d871ba6db2d21dc7488a6329606110ed469466736173b1316e0641bd8285019081527f1d1e9426c878e01ccb77331c731b3901a85509a842c0feaa46056bb3eef91bd6606080850191909152908352845180860186527f082496185c77e2e88db3800da5fdb0544f636525239cbdf4d57113ca585837f281527f0c91b8bd5ceb9915b8d5e5c64cb03e340123c73808d24e511c8f6033f6b9a3c7818601528385015285840192909252835180820185527f0355d1d27c74654bee72169f6dce91e805473de37c80452735bf1f30460024848186019081527f17203899a5d282275bbd9ce5d78a7994bbbbe2372e659020fe957fb9d4fc3b63828501528152845180860186527f21b402f6a892a6646101eb658122c04d391395bfdcc336be81f2234a3986d4ca81527f0bc5eed1ea37a190d0b0b33dd26de907a066c0afdcc53c0a8172674d6177a4a8818601528185015285850152835190810184527f1e441dea72b508a31714cbd7f4b1e7f2869589d28e0a88eb03b9d6171f2de40b8185019081527f1da10869d961867fe3371113a484969754433b8b27cffb99841a0ed2fb3d8265828401528152835180850185527f0c69cf1fa03de69fd41feb3d602876d359586cf8629773949d66ff2e4d37214b81527f1903f47404c17f2a7baee0666096a24d9e40d1e4f2c4d603227c7b4b16d768a8818501528184015290840152815160078082526101008201909352919082015b61082a611170565b81526020019060019003908161082257505060808201908152604080518082019091527f2c32ff4c71046162d407c4617843306414db2ea98e5579a2a5f2cfe9c023a73581527f12f6ece48050133ac693189c1924940b50c5eb0012d652801a7a93783918d9d06020820152905180516000906108a357fe5b602002602001018190525060405180604001604052807f0322b7550e03ad398e01110033eaa6e68252d5d3c44770a41c528ed0cedf706981526020017f02155ba7d645ae13fece5f0789273edbe2a80f58cdb390a0c81b930d4a23741c815250816080015160018151811061091457fe5b602002602001018190525060405180604001604052807f1b6acde76b3425d5e57e38af380b5ec463eda347a5bed382431f49579b83606b81526020017f0f8fe87071a42eb012b42e67fcc7a9dec879062782b25ac86f95abe9d6f8b2f7815250816080015160028151811061098557fe5b602002602001018190525060405180604001604052807f18cec0dcc8075da3fb01871b5b6fb77ec865f399e0b0d2fb5c5c5d04a0230b4381526020017f03efeff87afc84e86410c38850cc980f2a563a3e0b5c025543f57c225f3bace381525081608001516003815181106109f657fe5b602002602001018190525060405180604001604052807f1a66a79989431e69f754e16e6c7af9d451ca651070d0ca8fe3c54497e2c20b8c81526020017f0a199ac1c672ef73940a673d3811d2abaf4abb0647a811328e2d5bf143ad41f68152508160800151600481518110610a6757fe5b602002602001018190525060405180604001604052807f29e00e1b8b214d845e9102c985e4e1c1138789b3a532d7d8780ed8258931bf3c81526020017f09d2fc74daa8ebd524cdb20e3d33bbb10156c8a1648c7907847253bb42f4d2908152508160800151600581518110610ad857fe5b602002602001018190525060405180604001604052807f134da130e0a564a79fc6b6a9336d35ab21b754ee1257e3359b55b2807db897fb81526020017f0d9a4b48680b37caee7acf07915572abfeac331e8b212d51240b9cc947e506288152508160800151600681518110610b4957fe5b602002602001018190525090565b610b5f611170565b610b6761118a565b835181526020808501519082015260408101839052600060608360808460076107d05a03fa9050808015610b9a57610b9c565bfe5b5080610be4576040805162461bcd60e51b81526020600482015260126024820152711c185a5c9a5b99cb5b5d5b0b59985a5b195960721b604482015290519081900360640190fd5b505092915050565b610bf4611170565b610bfc6111a8565b8351815260208085015181830152835160408301528301516060808301919091526000908360c08460066107d05a03fa9050808015610b9a575080610be4576040805162461bcd60e51b81526020600482015260126024820152711c185a5c9a5b99cb5859190b59985a5b195960721b604482015290519081900360640190fd5b610c85611170565b81517f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4790158015610cb857506020830151155b15610cd85750506040805180820190915260008082526020820152610d04565b60405180604001604052808460000151815260200182856020015181610cfa57fe5b0683038152509150505b919050565b60408051600480825260a08201909252600091829190816020015b610d2c611170565b815260200190600190039081610d2457505060408051600480825260a0820190925291925060009190602082015b610d626111c6565b815260200190600190039081610d5a5790505090508a82600081518110610d8557fe5b60200260200101819052508882600181518110610d9e57fe5b60200260200101819052508682600281518110610db757fe5b60200260200101819052508482600381518110610dd057fe5b60200260200101819052508981600081518110610de957fe5b60200260200101819052508781600181518110610e0257fe5b60200260200101819052508581600281518110610e1b57fe5b60200260200101819052508381600381518110610e3457fe5b6020026020010181905250610e498282610e58565b9b9a5050505050505050505050565b60008151835114610ea9576040805162461bcd60e51b81526020600482015260166024820152751c185a5c9a5b99cb5b195b99dd1a1ccb59985a5b195960521b604482015290519081900360640190fd5b82516006810260008167ffffffffffffffff81118015610ec857600080fd5b50604051908082528060200260200182016040528015610ef2578160200160208202803683370190505b50905060005b8381101561107757868181518110610f0c57fe5b602002602001015160000151828260060260000181518110610f2a57fe5b602002602001018181525050868181518110610f4257fe5b602002602001015160200151828260060260010181518110610f6057fe5b602002602001018181525050858181518110610f7857fe5b602090810291909101015151518251839060026006850201908110610f9957fe5b602002602001018181525050858181518110610fb157fe5b60209081029190910101515160016020020151828260060260030181518110610fd657fe5b602002602001018181525050858181518110610fee57fe5b60200260200101516020015160006002811061100657fe5b602002015182826006026004018151811061101d57fe5b60200260200101818152505085818151811061103557fe5b60200260200101516020015160016002811061104d57fe5b602002015182826006026005018151811061106457fe5b6020908102919091010152600101610ef8565b506110806111e6565b6000602082602086026020860160086107d05a03fa9050808015610b9a5750806110e9576040805162461bcd60e51b81526020600482015260156024820152741c185a5c9a5b99cb5bdc18dbd9194b59985a5b1959605a1b604482015290519081900360640190fd5b505115159695505050505050565b604051806060016040528061110a611170565b81526020016111176111c6565b8152602001611124611170565b905290565b6040518060a0016040528061113c611170565b81526020016111496111c6565b81526020016111566111c6565b81526020016111636111c6565b8152602001606081525090565b604051806040016040528060008152602001600081525090565b60405180606001604052806003906020820280368337509192915050565b60405180608001604052806004906020820280368337509192915050565b60405180604001604052806111d9611204565b8152602001611124611204565b60405180602001604052806001906020820280368337509192915050565b6040518060400160405280600290602082028036833750919291505056fea26469706673582212209a25079a1f11c41702f2789e07de03e8e799a6c7ebad517c063f550be7a598d164736f6c63430007060033";