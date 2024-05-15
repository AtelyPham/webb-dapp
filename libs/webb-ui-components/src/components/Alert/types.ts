import { IWebbComponentBase } from '../../types/index.js';

/**
 * Props for `Alert` component
 */
export interface AlertProps extends IWebbComponentBase {
  /**
   * Alert sizes - `sm`, `md` (default: "md")
   */
  size?: 'sm' | 'md';
  /**
   * Type of alert - `info`, `success`, `error` (default: "info")
   */
  type?: 'info' | 'success' | 'error' | 'warning';
  /**
   * Title of alert
   */
  title?: string;
  /**
   * Description of alert
   */
  description?: string;
}
