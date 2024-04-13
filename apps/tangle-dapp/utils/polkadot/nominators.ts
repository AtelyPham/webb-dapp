import type { HexString } from '@polkadot/util/types';

import { extractNameFromInfo } from '../../data/ValidatorTables/useValidatorIdentityNames';
import { getApiPromise } from './api';
import { getTxPromise } from './utils';

export const getTotalNumberOfNominators = async (
  rpcEndpoint: string,
  validatorAddress: string
): Promise<number> => {
  const api = await getApiPromise(rpcEndpoint);
  const nominators = await api.query.staking.nominators.entries();

  const totalNominators = nominators.filter(([, nominatorData]) => {
    if (nominatorData.isNone) {
      return false;
    }

    const nominations = nominatorData.unwrap();

    return (
      nominations.targets &&
      nominations.targets.some(
        (target) => target.toString() === validatorAddress
      )
    );
  });

  return totalNominators.length;
};

export const getValidatorIdentity = async (
  rpcEndpoint: string,
  validatorAddress: string
): Promise<string> => {
  const api = await getApiPromise(rpcEndpoint);
  const identityOpt = await api.query.identity.identityOf(validatorAddress);

  // If the identity is set, get the custom display name
  // and use that as the name instead of the address.
  if (identityOpt.isSome) {
    const identity = identityOpt.unwrap();
    const info = identity[0].info;
    const displayName = extractNameFromInfo(info);

    if (displayName !== null) {
      return displayName;
    }
  }

  // Default the name to be the validator's address if the
  // validator has no identity set.
  return validatorAddress;
};

export const getValidatorCommission = async (
  rpcEndpoint: string,
  validatorAddress: string
): Promise<string> => {
  const api = await getApiPromise(rpcEndpoint);
  const validatorPrefs = await api.query.staking.validators(validatorAddress);
  const commissionRate = validatorPrefs.commission.unwrap().toNumber();
  const commission = commissionRate / 10_000_000;

  return commission.toString();
};

export const getMaxNominationQuota = async (
  rpcEndpoint: string
): Promise<number | undefined> => {
  const api = await getApiPromise(rpcEndpoint);
  const maxNominations = api.query.staking.maxNominatorsCount;

  return parseInt(maxNominations.toString());
};

export const nominateValidators = async (
  rpcEndpoint: string,
  nominatorAddress: string,
  validatorAddresses: string[]
): Promise<HexString> => {
  const api = await getApiPromise(rpcEndpoint);
  const tx = api.tx.staking.nominate(validatorAddresses);

  return getTxPromise(nominatorAddress, tx);
};

export const stopNomination = async (
  rpcEndpoint: string,
  nominatorAddress: string
) => {
  const api = await getApiPromise(rpcEndpoint);
  const tx = api.tx.staking.chill();

  return getTxPromise(nominatorAddress, tx);
};
