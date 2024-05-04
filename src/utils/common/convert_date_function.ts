export default function convertToVNDateFormat(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}