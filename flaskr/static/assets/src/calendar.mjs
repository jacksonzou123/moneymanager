export const calendar = props => {
  const monthTotalDays = _ =>
    new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 0).getDate();
  const monthStartWeekDay = _ =>
    new Date(`${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-01`).getUTCDay();
  const totalRows = _ =>
    monthTotalDays() - (6 - monthStartWeekDay()) / 7
  const calculateRow = _ => {

  };
  return (
    `
      <div>
        ${totalRows.}
        <div class='row'></div>
        <div class='row'></div>
        <div class='row'></div>
        <div class='row'></div>
        <div class='row'></div>
      </div>
    `
  );
};