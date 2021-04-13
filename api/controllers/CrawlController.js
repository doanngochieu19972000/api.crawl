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
		  var match = req.params.id == 0 
				? "https://shopee.vn/api/v4/search/search_items?by=pop&limit=30&match_id=88201679&newest=0&order=desc&page_type=shop&version=2" 
				: "https://shopee.vn/api/v4/search/search_items?by=pop&limit=30&match_id=88201679&newest=0&order=desc&page_type=shop&shop_categoryids=" + req.params.id + "&version=2";

		 var link = req.params.id == 0 
		 ? "https://shopee.vn/apple_flagship_store?page=0"
		 : "https://shopee.vn/apple_flagship_store?page=0&shopCollection=" + req.params.id;

		  page.on("response", async (response) => {
				

				if (response.url().includes(match))
        		   console.log(response.url());  

				if (response.url().includes(match)) {
					
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
					
					res.json(result);
				}

				
		  });

		  await page.goto(link, {
					waitUntil: "networkidle0",
		  		});

		  		await browser.close();

		  
		});
	}
}

