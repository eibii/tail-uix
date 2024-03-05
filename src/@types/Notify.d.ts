export type NotifyMessage = {
  status: "danger" | "warn" | "info" | "success";
  title: string;
  message: string;
  percent?: number;
  duration?: number;
  autoClose?: boolean;
};
