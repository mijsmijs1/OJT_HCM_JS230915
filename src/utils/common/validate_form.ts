// Email
export const isValidEmail = (email: any) => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Phone
export const isValidPhone = (phone: string): boolean => {
    const phonePattern = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    return phonePattern.test(phone);
}

// Url
export const isValidUrl = (url: string) => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?' + // port
        '(\\/[-a-z\\d%_.~+]*)*' + // path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return urlPattern.test(url);
}
