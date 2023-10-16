export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
    return newNumber;
}

export const getUniqueValues = (propName, data) => {
    let values = data.map((item) => item[propName]);
    const uniqueValues = ['all', ...new Set(values)];
    return uniqueValues;
}