import * as fs from "fs";

const filePath = "./dist/style.css";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const updatedData = data.replace(/--tw/g, "--tx");

  fs.writeFile(filePath, updatedData, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Substituição concluída com sucesso!");
  });
});
