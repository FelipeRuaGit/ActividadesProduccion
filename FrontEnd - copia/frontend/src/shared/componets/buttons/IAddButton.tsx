export interface IAddButton {
  text: string;
  disabled?: boolean;
  loadingText?: string;
  icon?: string;
  action?: () => void;
}
