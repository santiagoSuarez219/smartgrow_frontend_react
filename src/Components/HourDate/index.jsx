import { useEffect, useState } from "react";
import { useInterval } from './useInterval';

const HourDate = () => {
  const [date, setDate] = useState(new Date());

  const dayOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const monthString = [
    "En",
    "Feb",
    "Mzo",
    "Abr",
    "My",
    "Jun",
    "Jul",
    "Ag",
    "Set",
    "Oct",
    "Nov",
    "Dic",
  ];

  const getFormattedDate = () => {
    const dayWeek = date.getDay();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    let hourString = hour < 10 ? "0" + hour : hour;
    let minutesString = minutes < 10 ? "0" + minutes : minutes;
    let amPm = hour >= 12 ? "PM" : "AM";

    return `${hourString}:${minutesString} ${amPm} ${dayOfWeek[dayWeek]} ${monthString[month]}. ${day}, ${year}`;
  };

  useEffect(() => {
    setFormattedDate(getFormattedDate());
  }, [date]);

  useInterval(() => {
    setDate(new Date());
  }, 1000); 

  const [formattedDate, setFormattedDate] = useState(getFormattedDate());

  return (
    <div className="my-1 h-auto">
      <h4 className="w-full text-sm text-center font-medium lg:text-lg">{formattedDate}</h4>
    </div>
  );
};

export default HourDate;

