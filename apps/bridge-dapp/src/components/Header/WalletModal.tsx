import { Chain } from '@webb-tools/dapp-config';
import {
  ChainListCard,
  Modal,
  ModalContent,
  useWebbUI,
  WalletConnectionCard,
} from '@webb-tools/webb-ui-components';
import { ChainType } from '@webb-tools/webb-ui-components/components/BridgeInputs/types';
import { FC } from 'react';
import { useConnectWallet } from '../../hooks';

export const WalletModal: FC<{
  sourceChains: ChainType[];
  chain: Chain;
}> = ({ chain, sourceChains }) => {
  const { setMainComponent } = useWebbUI();
  const {
    isModalOpen,
    toggleModal,
    switchWallet,
    connectingWalletId,
    failedWalletId,
    selectedWallet,
  } = useConnectWallet(true);

  return (
    <>
      <ChainListCard
        className="w-[550px] h-[720px]"
        chainType="source"
        chains={sourceChains}
      />
      <Modal open={isModalOpen} onOpenChange={(open) => toggleModal(open)}>
        <ModalContent isOpen={isModalOpen} isCenter>
          <WalletConnectionCard
            wallets={Object.values(chain.wallets)}
            onWalletSelect={async (wallet) => {
              await switchWallet(chain, wallet);
            }}
            onClose={() => setMainComponent(undefined)}
            connectingWalletId={connectingWalletId}
            failedWalletId={failedWalletId}
            onTryAgainBtnClick={async () => {
              if (!selectedWallet) {
                throw new Error(
                  'There is not selected wallet in try again function'
                );
              }
              await switchWallet(chain, selectedWallet);
            }}
          />
        </ModalContent>
      </Modal>
    </>
  );
};