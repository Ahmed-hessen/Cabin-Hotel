import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBarSquare,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1) BOOKINGS
  const numBookings = bookings.length;
  // 2) SALES
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  // 3) CHECK INS
  const checkIns = confirmedStays.length;
  //4)OCCUPANCY RATE
  const occupation =
    confirmedStays.reduce((a, b) => a + b.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />
      <Stat
        title="Sales"
        icon={<HiOutlineCurrencyDollar />}
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check Ins"
        icon={<HiOutlineCalendar />}
        color="indigo"
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBarSquare />}
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default stats;
