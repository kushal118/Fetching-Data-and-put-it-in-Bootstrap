// DON'T EDIT THOSE LINES
const dataURLBase = "https://docs.google.com/spreadsheets/d/";
const dataURLEnd = "/gviz/tq?tqx=out:json&tq&gid=";
const id = "1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE";
const gids = ["0", "1574569648", "1605451198"];
// END OF DATA SETUP

const employesUrl = fetch(`${dataURLBase}${id}${dataURLEnd}${gids[0]}`);
const hiringUrl = fetch(`${dataURLBase}${id}${dataURLEnd}${gids[1]}`);
const salaryUrl = fetch(`${dataURLBase}${id}${dataURLEnd}${gids[2]}`);
// TODO your code here

const awaitFunc = async function () {
  const responses = await Promise.all([employesUrl, hiringUrl, salaryUrl]);
  const datas = await Promise.all(
    responses.map(async (response) => {
      const text = await response.text();
      return await JSON.parse(text.substring(47).slice(0, -2)).table.rows;
    })
  );

  datas[0].shift();
  console.log(datas[0]);
  const formattedData = [];
  datas[0].forEach((item, index) => {
    formattedData.push({
      first: datas[0][index].c[0].v,
      last: datas[0][index].c[1].v,
      date: new Date(datas[1][index].c[0].f).toString().slice(4, 15),
      salary: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(datas[2][index].c[0].v),
    });
  });
  return formattedData;
};

awaitFunc().then((formattedData) => {
  $("#employees").bootstrapTable({
    columns: [
      {
        title: "Last",
        field: "last",
        sortable: true,
      },
      {
        title: "First",
        field: "first",
        sortable: true,
      },
      {
        title: "Date",
        field: "date",
        sortable: true,
      },
      {
        title: "Money",
        field: "salary",
        sortable: true,
        sorter(a, b) {
          a.replace(/[^\d\.]/g, "");
          return (
            Number(a.replace(/[^\d\.]/g, "")) -
            Number(b.replace(/[^\d\.]/g, ""))
          );
        },
      },
    ],
    sortable: true,
    data: formattedData,
  });
});

/*sort(a, b) => return new Date(a) - new Date(b)*/