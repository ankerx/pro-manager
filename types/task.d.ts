declare interface Task {
  title: String;
  description: String;
  id: String;
  userId: String;
  status?: String;
  show?: Boolean;
  sections?: String[];
  setShow?: (arg: Boolean) => void;
}
