const randomArray = (length, max) => [...new Array(length)]
    .map(() => Math.round(Math.random() * max));


    export default randomArray;