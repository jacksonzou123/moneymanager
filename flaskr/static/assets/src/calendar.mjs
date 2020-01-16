export const calendar = props => {
  const filterForThisDate = date => {
    const filtered = props.transaction.filter(({ transaction_date }) => new Date(transaction_date).getUTCDate() === new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), date).getUTCDate());
    let amount = 0;
    if (filtered.length) {
      filtered.forEach(({ transaction_amount }) => amount += transaction_amount);
    }
    if (new Date().getUTCMonth() === new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), date).getUTCMonth()) {
      return `<span class='${amount === 0 ? 'text-muted' : 'text-success'}'>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount)}</span>`;
    }
    else {
      return '';
    }
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
        const date = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), startWeekDay++);
        return date.getUTCMonth() === new Date().getUTCMonth() ? new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date) : ''
      });
    });
  }

  return (
    `
      <div class='d-flex justify-content-center flex-column border rounded mb-3 mx-5 py-3'>
        <div class='d-flex flex-row justify-content-center mb-3'>
          <h4>${new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())}</h4>
        </div>
        <div class='table-responsive'>
          <table class='table table-hover'>
            <thead>
              <tr>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
            </thead>
            <tbody>
            ${populateCalendar().map(row => `
              <tr>
                ${row.map(date => `
                  <td>
                    <h6>${date}</h6>
                    ${filterForThisDate(date)}
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
