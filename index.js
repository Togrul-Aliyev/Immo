const puppeteer = require("puppeteer");
const fs = require("fs");

const PAGE_URL ="https://www.hansimmo.be/";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const items = await page.evaluate(() => {
    
    let return_data = [];
    let elements = Array.from(document.querySelectorAll(".category, .city, .price"));
    let links = elements.map(element => {
      return element.textContent
    })
    for (let i = 0; i < links.length; i+=3){
      let temp = {category: links[i], city: links[i+1], price: links[i+2]};
      return_data.push(temp)
    }
    return return_data

    // return elements
    // return {
    //   description: "",
    //   title: "",
    //   price: "",
    //   address: "",
    // };
  });
  return items;
};

main().then((data) => fs.writeFileSync('./file.json', JSON.stringify(data)));
// fs.writeFileSync('./file.json', JSON.stringify(data))