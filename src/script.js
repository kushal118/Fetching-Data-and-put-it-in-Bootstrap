// DON'T EDIT THOSE LINES
const dataURLBase = "https://docs.google.com/spreadsheets/d/";
const dataURLEnd = "/gviz/tq?tqx=out:json&tq&gid=";
const id = "1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE";
const gids = ["0", "1574569648", "1605451198"];
// END OF DATA SETUP

const employesUrl = fetch(
  "https://docs.google.com/spreadsheets/d/1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE/gviz/tq?tqx=out:json&tq&gid=0"
);
const hiringUrl = fetch(
  "https://docs.google.com/spreadsheets/d/1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE/gviz/tq?tqx=out:json&tq&gid=1574569648"
);
const salaryUrl = fetch(
  "https://docs.google.com/spreadsheets/d/1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE/gviz/tq?tqx=out:json&tq&gid=1605451198"
);
// TODO your code here

const awaitFunc = async function () {
  const responses = await Promise.all([employesUrl, hiringUrl, salaryUrl]);
  const json = responses.map(async (response) => {
    const text = await response.text();
    const object = await JSON.parse(text.substring(47).slice(0, -2));
    const table = object.table;
    console.log(table);

    $(function () {
      $("#employees").bootstrapTable({
        url: "data1.json",
        data: table.row,
      });
    });
  });

  datas.forEach((data) => data.parseInt());

  const date = new Date();

  // const data = await Promise.all(datas);
};

awaitFunc();
