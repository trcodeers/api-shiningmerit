

const sortTableValueByKey = (arr, key) =>{

   return arr.sort((a, b) => {
        const value1 = a[key]
        const value2 = b[key]
        if (value1 < value2) return -1;
        if (value1 > value2) return 1;
        return 0;
    });

}

export default sortTableValueByKey;