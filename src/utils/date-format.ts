export const dateFormat = async (mask = 'dd/MM/yyyy HH:mm:ss', date = new Date()): Promise<string> => {
    
    const getLongMonth = (month: string): string => {
        if (month === '01') {
            return 'Janeiro';
        } if (month === '02') {
            return 'Fevereiro';
        } if (month === '03') {
            return 'Março';
        } if (month === '04') {
            return 'Abril';
        } if (month === '05') {
            return 'Maio';
        } if (month === '06') {
            return 'Junho';
        } if (month === '07') {
            return 'Julho';
        } if (month === '08') {
            return 'Agosto';
        } if (month === '09') {
            return 'Setembro';
        } if (month === '10') {
            return 'Outubro';
        } if (month === '11') {
            return 'Novembro';
        } if (month === '12') {
            return 'Dezembro';
        }

        return '';
    };

    if (date.getTime() < date.getTimezoneOffset() * 60 * 1000) {
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }

    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    const millisecond = String(date.getMilliseconds()).padStart(3, '0');

    let maskOut = mask.replace(/MMMM/g, getLongMonth(month));

    maskOut = maskOut.replace(/yyyy/g, year);
    maskOut = maskOut.replace(/yy/g, year.substring(2));
    maskOut = maskOut.replace(/MM/g, month);
    maskOut = maskOut.replace(/dd/g, day);
    maskOut = maskOut.replace(/HH/g, hour);
    maskOut = maskOut.replace(/mm/g, minute);
    maskOut = maskOut.replace(/ss/g, second);
    maskOut = maskOut.replace(/SSS/g, millisecond);

    return maskOut;
};
