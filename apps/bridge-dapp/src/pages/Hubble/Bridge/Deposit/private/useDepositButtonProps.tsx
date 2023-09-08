import { useWebContext } from '@webb-tools/api-provider-environment/webb-context';
import { ZERO_BIG_INT, chainsPopulated } from '@webb-tools/dapp-config';
import { CurrencyConfig } from '@webb-tools/dapp-config/currencies/currency-config.interface';
import { WebbError, WebbErrorCodes } from '@webb-tools/dapp-types';
import { useNoteAccount } from '@webb-tools/react-hooks/useNoteAccount';
import numberToString from '@webb-tools/webb-ui-components/utils/numberToString';
import { ComponentProps, useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatEther, parseEther } from 'viem';
import {
  AMOUNT_KEY,
  BRIDGE_PATH,
  DEPOSIT_PATH,
  DEST_CHAIN_KEY,
  POOL_KEY,
  SOURCE_CHAIN_KEY,
  TOKEN_KEY,
} from '../../../../../constants';
import DepositConfirmContainer from '../../../../../containers/DepositConfirmContainer/DepositConfirmContainer';
import { useConnectWallet } from '../../../../../hooks/useConnectWallet';
import handleTxError from '../../../../../utils/handleTxError';

function useDepositButtonProps({
  balance,
  fungible,
}: {
  balance?: number;
  fungible?: CurrencyConfig;
}) {
  const {
    activeApi,
    activeWallet,
    activeChain,
    switchChain,
    apiConfig,
    noteManager,
    loading,
    isConnecting,
  } = useWebContext();

  const { toggleModal, isWalletConnected } = useConnectWallet();

  const { hasNoteAccount, setOpenNoteAccountModal } = useNoteAccount();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [generatingNote, setGeneratingNote] = useState(false);

  const [depositConfirmComponent, setDepositConfirmComponent] =
    useState<React.ReactElement<
      ComponentProps<typeof DepositConfirmContainer>,
      typeof DepositConfirmContainer
    > | null>(null);

  const [amount, tokenId, poolId, srcTypedId, destTypedId] = useMemo(() => {
    return [
      searchParams.get(AMOUNT_KEY) ?? '',
      searchParams.get(TOKEN_KEY) ?? '',
      searchParams.get(POOL_KEY) ?? '',
      searchParams.get(SOURCE_CHAIN_KEY) ?? '',
      searchParams.get(DEST_CHAIN_KEY) ?? '',
    ];
  }, [searchParams]);

  const validAmount = useMemo(() => {
    if (!amount) {
      return false;
    }

    const amountFloat = parseFloat(amount);

    // If balance is not a number, but amount is entered and > 0,
    // it means user not connected to wallet but entered amount
    // so we allow it
    if (typeof balance !== 'number' && amountFloat > 0) {
      return true;
    }

    if (!balance || amountFloat <= 0) {
      return false;
    }

    const parsedBalance = parseEther(numberToString(balance));
    const parsedAmount = BigInt(amount); // amount from search params is parsed already

    return parsedAmount !== ZERO_BIG_INT && parsedAmount <= parsedBalance;
  }, [amount, balance]);

  const inputCnt = useMemo(() => {
    if (!tokenId) {
      return 'Select token';
    }

    if (!destTypedId) {
      return 'Select destination chain';
    }

    if (!amount) {
      return 'Enter amount';
    }

    if (!poolId) {
      return 'Select pool';
    }

    if (!srcTypedId) {
      return 'Select source chain';
    }

    return undefined;
  }, [amount, destTypedId, poolId, srcTypedId, tokenId]);

  const conncnt = useMemo(() => {
    if (!activeApi) {
      return 'Connect Wallet';
    }

    if (!hasNoteAccount) {
      return 'Create Note Account';
    }

    const activeId = activeApi.typedChainidSubject.getValue();
    if (`${activeId}` !== srcTypedId) {
      return 'Switch Chain';
    }

    return undefined;
  }, [activeApi, hasNoteAccount, srcTypedId]);

  const amountCnt = useMemo(() => {
    if (BigInt(amount) === ZERO_BIG_INT) {
      return 'Enter amount';
    }

    if (!validAmount) {
      return 'Insufficient balance';
    }
  }, [amount, validAmount]);

  const children = useMemo(() => {
    if (inputCnt) {
      return inputCnt;
    }

    if (amountCnt) {
      return amountCnt;
    }

    if (conncnt) {
      return conncnt;
    }

    if (tokenId !== poolId) {
      return 'Wrap and Deposit';
    }

    return 'Deposit';
  }, [amountCnt, conncnt, inputCnt, poolId, tokenId]);

  const isDisabled = useMemo(() => {
    const allInputsFilled =
      !!amount && !!tokenId && !!poolId && !!srcTypedId && !!destTypedId;

    if (!allInputsFilled || !validAmount) {
      return true;
    }

    return false;
  }, [amount, destTypedId, poolId, srcTypedId, tokenId, validAmount]); // prettier-ignore

  const isLoading = useMemo(() => {
    return loading || isConnecting || generatingNote;
  }, [generatingNote, isConnecting, loading]);

  const loadingText = useMemo(() => {
    if (generatingNote) {
      return 'Generating note...';
    }

    return 'Connecting...';
  }, [generatingNote]);

  const handleSwitchChain = useCallback(async () => {
    const nextChain = chainsPopulated[Number(srcTypedId)];
    if (!nextChain) {
      throw WebbError.from(WebbErrorCodes.UnsupportedChain);
    }

    const isNextChainActive = activeChain?.id === nextChain.id && activeChain?.chainType === nextChain.chainType;

    if (!isWalletConnected || !isNextChainActive) {
      if (activeWallet && nextChain.wallets.includes(activeWallet.id)) {
        await switchChain(nextChain, activeWallet);
      } else {
        toggleModal(true, nextChain);
      }
      return;
    }

    if (!hasNoteAccount) {
      setOpenNoteAccountModal(true);
    }
  }, [activeChain?.chainType, activeChain?.id, activeWallet, hasNoteAccount, isWalletConnected, setOpenNoteAccountModal, srcTypedId, switchChain, toggleModal]); // prettier-ignore

  const handleBtnClick = useCallback(async () => {
    try {
      if (conncnt) {
        return await handleSwitchChain();
      }

      if (!noteManager || !activeApi) {
        throw WebbError.from(WebbErrorCodes.ApiNotReady);
      }

      if (!fungible) {
        throw WebbError.from(WebbErrorCodes.NoFungibleTokenAvailable);
      }

      const srcTypedIdNum = Number(srcTypedId);
      const destTypedIdNum = Number(destTypedId);
      const poolIdNum = Number(poolId);

      if (Number.isNaN(srcTypedIdNum) || Number.isNaN(destTypedIdNum) || Number.isNaN(poolIdNum)) {
        throw WebbError.from(WebbErrorCodes.UnsupportedChain);
      }

      const srcChain = chainsPopulated[srcTypedIdNum];
      const destChain = chainsPopulated[destTypedIdNum];

      if (!srcChain || !destChain) {
        throw WebbError.from(WebbErrorCodes.UnsupportedChain);
      }

      setGeneratingNote(true);

      const srcAnchorId = apiConfig.getAnchorIdentifier(
        poolIdNum,
        srcTypedIdNum
      );

      const destAnchorId = apiConfig.getAnchorIdentifier(
        poolIdNum,
        destTypedIdNum
      );

      if (!srcAnchorId || !destAnchorId) {
        throw WebbError.from(WebbErrorCodes.AnchorIdNotFound);
      }

      const amountBig = BigInt(amount);
      const transactNote = await noteManager.generateNote(
        activeApi.backend,
        srcTypedIdNum,
        srcAnchorId,
        destTypedIdNum,
        destAnchorId,
        fungible.symbol,
        fungible.decimals,
        amountBig
      )

      setGeneratingNote(false);

      setDepositConfirmComponent(
        <DepositConfirmContainer
          fungibleTokenId={poolIdNum}
          wrappableTokenId={tokenId ? Number(tokenId) : undefined}
          amount={parseFloat(formatEther(amountBig))}
          sourceChain={{
            name: srcChain.name,
            type: srcChain.group
          }}
          destChain={{
            name: destChain.name,
            type: destChain.group
          }}
          note={transactNote}
          onResetState={() => {
            setDepositConfirmComponent(null)
            navigate(`/${BRIDGE_PATH}/${DEPOSIT_PATH}`)
          }}
          onClose={() => {
            setDepositConfirmComponent(null)
          }}
        />
      )
    } catch (error) {
      handleTxError(error, 'Deposit');
    }
  }, [activeApi, amount, apiConfig, conncnt, destTypedId, fungible, handleSwitchChain, navigate, noteManager, poolId, srcTypedId, tokenId]); // prettier-ignore

  return {
    children,
    isLoading,
    loadingText,
    onClick: handleBtnClick,
    isDisabled,
    depositConfirmComponent,
  };
}

export default useDepositButtonProps;