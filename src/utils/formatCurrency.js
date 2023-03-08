const formatCurrency = value => {
    let number = value || 0;
    return Number(number)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export default formatCurrency;
