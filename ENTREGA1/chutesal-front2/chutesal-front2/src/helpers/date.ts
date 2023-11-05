export const convertToDateString = (stringDate: string) => {
  if(!stringDate)
      return

  const date = new Date(stringDate);

  console.log({date});
  
  const conv = date.toLocaleDateString("pt-BR",{timeZone: "UTC"}).replace(/\//g,"-")
  console.log({conv});
  return conv;
  
}



export const convertToDate = (dateString: string) => {
  if(!dateString) return

  const [day, month, year] = dateString.split('-')

  const date = new Date(Number(year),Number(month) - 1,Number(day));
  
  return date;
}

