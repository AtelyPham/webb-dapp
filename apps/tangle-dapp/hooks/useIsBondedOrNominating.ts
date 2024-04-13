import { useCallback } from 'react';

import useApiRx from './useApiRx';
import useErrorReporting from './useErrorReporting';
import useSubstrateAddress from './useSubstrateAddress';

const useIsBondedOrNominating = () => {
  const activeSubstrateAddress = useSubstrateAddress();

  const {
    data: nominators,
    isLoading: isLoadingNominators,
    error: nominatorsError,
  } = useApiRx(
    useCallback(
      (api) => {
        if (activeSubstrateAddress === null) {
          return null;
        }

        return api.query.staking.nominators(activeSubstrateAddress);
      },
      [activeSubstrateAddress]
    )
  );

  const {
    data: bondedInfo,
    isLoading: isLoadingBondedInfo,
    error: bondedInfoError,
  } = useApiRx(
    useCallback(
      (api) => {
        if (activeSubstrateAddress === null) {
          return null;
        }

        return api.query.staking.bonded(activeSubstrateAddress);
      },
      [activeSubstrateAddress]
    )
  );

  useErrorReporting(
    'Failed to determine whether the account is a first time nominator',
    nominatorsError,
    bondedInfoError
  );

  const isBondedOrNominating = (() => {
    if (bondedInfo === null || nominators === null) {
      return null;
    }

    const hasNominatedValidators = nominators.isSome;
    const isBonded = bondedInfo.isSome;

    // TODO: Invert condition.
    return isBonded || hasNominatedValidators;
  })();

  return {
    isBondedOrNominating,
    isLoading: isLoadingBondedInfo || isLoadingNominators,
    isError: nominatorsError !== null || bondedInfoError !== null,
  };
};

export default useIsBondedOrNominating;
