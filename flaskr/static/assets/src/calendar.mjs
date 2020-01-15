export const calendar = props => {
  const monthTotalDays = _ =>
    new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 0).getDate();
  const monthStartWeekDay = _ =>
    new Date(`${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-01`).getUTCDay();
  const totalRows = _ =>
    ((monthTotalDays() - (6 - monthStartWeekDay())) / 7) + 1
  const calculateRow = _ =>
    Array.from(Array(totalRows()).keys())
  const populateRow = _ =>
    calculateRow().map(row => Array.from(Array(6).keys()))

  return (
    `
      <div>
        ${populateRow().map(row => `
          <div class='d-flex flex-row justify-content-center'>${row.map(day => `
            <div class='card m-1'>
              <div class='card-body'>
                <h5 class='card-title'>Date</h5>
              </div>
            </div>
          `).join('')}</div>
        `).join('')}
      </div>
    `
  );
};