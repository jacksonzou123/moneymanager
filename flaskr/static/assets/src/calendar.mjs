export const calendar = props => {
  const filterForThisDate = date => {
    const filtered = props.transaction.filter(({ transaction_date }) => new Date(transaction_date).getUTCDate() === new Date(date).getUTCDate());
    if (filtered.length) {
      let amount = 0;
      filtered.forEach(({ transaction_amount }) => amount += transaction_amount);
      return amount;
    }
    return 0;
  }

  const monthTotalDays = _ =>
    new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 0).getDate();
  const monthStartWeekDay = _ =>
    new Date(`${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-01`).getUTCDay();
  const totalRows = _ =>
    ((monthTotalDays() - (6 - monthStartWeekDay())) / 7) + 1
  const calculateRow = _ =>
    Array.from(Array(totalRows()).keys())
  const populateRow = _ =>
    calculateRow().map(_ => Array.from(Array(7).keys()))
  const populateCalendar = _ => {
    let startWeekDay = monthStartWeekDay() * -1 + 1;
    return populateRow().map(row => {
      return row.map(_ => {
        return new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), startWeekDay++);
      });
    });
  }

  return (
    `
      <div class='d-flex justify-content-center flex-column border rounded mb-3 mx-5 py-3'>
        <div class='d-flex flex-row justify-content-center'>
          <h4>${new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())}</h4>
        </div>
        <div class='table-responsive'>
          <table class='table table-striped'>
            <thead>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </thead>
            <tbody>
            ${populateCalendar().map(row => `
              <tr>
                ${row.map(date => `
                  <td>
                    <h6>${new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'numeric' }).format(new Date(date))}</h6>
                    <span class='text-success'>$${filterForThisDate(date)}</span>
                  </td>
                `).join('')}
              </tr>
            `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `
  );
};
