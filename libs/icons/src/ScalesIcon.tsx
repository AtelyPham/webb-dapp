import { createIcon } from './create-icon';
import { IconBase } from './types';

const ScalesIcon = (props: IconBase) => {
  return createIcon({
    ...props,
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    d: 'M8.66176 1.33301L8.66136 2.18501L11.9951 3.29695L14.4168 2.48973L14.8384 3.75465L12.8174 4.42834L14.8809 10.1029C14.153 10.8611 13.1292 11.333 11.9951 11.333C10.8611 11.333 9.83729 10.8611 9.10936 10.1029L11.172 4.42834L8.66136 3.59101V12.6663H11.3284V13.9997H4.66179V12.6663H7.32803V3.59101L4.81737 4.42834L6.88089 10.1029C6.15295 10.8611 5.12914 11.333 3.99512 11.333C2.86109 11.333 1.83729 10.8611 1.10938 10.1029L3.17204 4.42834L1.15185 3.75465L1.57348 2.48973L3.99512 3.29695L7.32803 2.18501L7.32843 1.33301H8.66176ZM11.9951 6.06812L11.05 8.66634H12.94L11.9951 6.06812ZM3.99512 6.06812L3.05004 8.66634H4.94004L3.99512 6.06812Z',
    displayName: 'ScalesIcon',
  });
};

export default ScalesIcon;