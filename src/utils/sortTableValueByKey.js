

export default sortTableValueByKey = (arr, key) =>{

   return arr.sort((a, b) => {
        const keyA = a[key]
        const keyB = b[key]
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

}