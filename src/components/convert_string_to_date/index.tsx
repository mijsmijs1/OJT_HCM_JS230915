export default function convertStringToDateValue(dateString: string) {
    // Tách phần ngày và phần thời gian từ chuỗi đầu vào
    let [datePart, timePart] = dateString.split('T');
    // Tách các phần của ngày
    let [year, month, day] = datePart.split('-');
    // Tạo giá trị mặc định cho input
    let defaultValue = `${year}-${month}-${day}`;
    // Trả về giá trị mặc định
    return defaultValue;
}
