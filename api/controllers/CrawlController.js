"use strict";

const puppeteer = require("puppeteer");

module.exports = {
	
	
	get:(req, res) => {
		var result = [];

		return new Promise(async (resolve, reject) => {
		  const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		  });
		  
		  const page = await browser.newPage();

		  page.on("response", async (response) => {
			if (response.url().includes("shop_categoryids"))
        		console.log(response.url());  

			if (response.url().includes(req.params.id)) {
			  const data = await response.json();
			  resolve(data);
			  
			  data.items.forEach(item => {
				result.push({
					name: item.item_basic.name,
					retailprice: item.item_basic.price_before_discount / 100000,
					saleprice: item.item_basic.price / 100000,
					image: "https://cf.shopee.vn/file/" + item.item_basic.image
				})
			  });
			  
			  console.log(result);
			  res.json(result);
			}
		  });

		  await page.goto("https://shopee.vn/apple_flagship_store??page=0&shopCollection=" + req.params.id, {
			waitUntil: "networkidle0",
		  });

		  await browser.close();
		});
	}
}

