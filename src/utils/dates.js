

export const getMonthDayNumer = (day, month) =>{
  
    if(day && month) return { month, day }
    
    const currentDate = new Date(Date.now()) 
    const currentMonth = currentDate.getMonth() + 1
    if(!month && !day){
        const day = currentDate.getDate()
        return{ month: currentMonth, day }
    }
     
    return { month }
}

