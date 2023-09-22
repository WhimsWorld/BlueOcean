function dateFormat(utc) {
  const date = new Date(utc);
  const month = (date.getMonth() + 1).toString().padStart(2, 'O');
  const day = date.getDate().toString().padStart(2, 'O');
  const year = date.getFullYear().toString();
  // const hour = date.getHours() % 12 || 12; // conver to 12 hour clock
  // const minute = date.getMinutes().toString().padStart(2, 'O');
  // const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}

export default dateFormat;
