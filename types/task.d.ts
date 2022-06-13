declare interface Task {
  title: string;
  description: string;
  id: string;
  status?: string;
  show?: boolean;
  setShow?: (arg: boolean) => void;
}
