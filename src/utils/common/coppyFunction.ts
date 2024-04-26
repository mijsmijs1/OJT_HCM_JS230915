import { message } from "antd";

export const coppySuccessfull = (content: string) => {
    navigator.clipboard.writeText(`${content}`);
    message.success(`Đã coppy thành công "${content}"`)
}