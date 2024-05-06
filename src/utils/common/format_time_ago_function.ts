export const formatTimeAgo = (dateString: string) => {
    const date: any = new Date(dateString);
    const now: any = new Date();
    const diff = Math.floor((now - date) / 1000); // Độ chênh lệch thời gian tính bằng giây

    if (diff < 60) {
        return `${diff} giây trước`;
    } else if (diff < 60 * 60) {
        const minutes = Math.floor(diff / 60);
        return `${minutes} phút trước`;
    } else if (diff < 60 * 60 * 24) {
        const hours = Math.floor(diff / (60 * 60));
        return `${hours} giờ trước`;
    } else if (diff < 60 * 60 * 24 * 7) {
        const days = Math.floor(diff / (60 * 60 * 24));
        return `${days} ngày trước`;
    } else if (diff < 60 * 60 * 24 * 30) {
        const weeks = Math.floor(diff / (60 * 60 * 24 * 7));
        return `${weeks} tuần trước`;
    } else {
        const months = Math.floor(diff / (60 * 60 * 24 * 30));
        return `${months} tháng trước`;
    }
}