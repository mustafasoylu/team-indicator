import { ReactElement } from 'react';

/**
 * Spinner for loading state after.
 * @category Component
 */
export function LoadingSpinner(): ReactElement {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}
