export enum WebbCurrencyId {
  /// Production edgeware token
  EDG,
  /// Test edgeware token
  TEDG,
  /// Ether token
  ETH,
  /// Harmony token
  ONE,
  /// WEBB
  WEBB,
  SDN,
}

export function webbCurrencyIdToString(c: WebbCurrencyId): string {
  switch (c) {
    case WebbCurrencyId.EDG:
      return 'EDG';
    case WebbCurrencyId.TEDG:
      return 'TEDG';
    case WebbCurrencyId.ETH:
      return 'ETH';
    case WebbCurrencyId.ONE:
      return 'ONE';
    case WebbCurrencyId.WEBB:
      return 'WEBB';
    case WebbCurrencyId.SDN:
      return 'SDN';
  }
}

export function webbCurrencyIdFromString(c: string): WebbCurrencyId {
  switch (c) {
    case 'EDG':
      return WebbCurrencyId.EDG;
    case 'TEDG':
      return WebbCurrencyId.TEDG;
    case 'ETH':
      return WebbCurrencyId.ETH;
    case 'ONE':
      return WebbCurrencyId.ONE;
    case 'WEBB':
      return WebbCurrencyId.WEBB;
    case 'SDN':
      return WebbCurrencyId.SDN;
    default:
      throw new Error(`${c} isn't a valid WebbCurrencyId`);
  }
}
