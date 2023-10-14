# API Documentation

## Endpoints

### MVP1

| endpoint             | method   | Description                            |
| -------------------- | -------- | -------------------------------------- |
| `/products`          | `GET`    | Get all products                       |
| `/products/stock`    | `PATCH`  | Update stock on multiple items at once |
| `/product/:id`       | `GET`    | Get specific product                   |
| `/product/:id/stock` | `PATCH`  | Update specific product stock          |
| `/companies`         | `GET`    | Get all companies                      |
| `/company/:id`       | `GET`    | Get specific company                   |
| `/cart`              | `GET`    | Get cart content                       |
| `/cart/add`          | `POST`   | Add item to cart                       |
| `cart/remove/:_id`   | `DELETE` | Remove item from cart                  |
| /`cart/remove/:_id`  | `PATCH`  | Remove one from item in cart           |

### GET /products

This endpoint will get all products available and respond like so:

```JSON
{
	"status": 200,
	"data": [
		{
			"_id": 6543,
			"name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
			"price": "$49.99",
			"body_location": "Wrist",
			"category": "Fitness",
			"imageSrc": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAtAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUIAgH/xABQEAABAwMCAwMGCQgGBgsAAAABAAIDBAUREiEGEzEHQVEiYXGBkcEUFTJScpKhsdEjM0JDYoKTokRFVbLC4RYkNVNj8CUmNDZkZXODlLPx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQADAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/ALxREQEREBERAREQFz66+Wm3zcmvudHTS4zy5p2tdjbuJ84WtxlzRwleTTuLJRQzFrgcEeQeh8V5dlqJ6qV0lVLLNIdi6Rxc4gAY3Pmwg9GVnaVwpSyPj+Muc9nUQxucPUcYPqK/KXtN4TqHOabkYS0Z/LRObn0bbrzvFjmeU3UNPTVsTj7l8yDL36G+SDkAnJx4e5B6ntHENovXN+K6+Gp5Tg1+g9CenXr0PsXTXk/h93L4htY5mk/DoRqBx+sbuPavWCAiIgIiICIiAiIgIiICIiAiIgIiICIiDjcZ6TwneGPcG8yjlY3JxlzmkAe0heeaLhp8czm10hjIIOiI79Nt+5X52g/91qv1feqvrGH4zlYBuNP90IO1wNwzZpatonttPMGM/Xs5n97Kk/FXCtgdROe2y29rx+kymY0+0BYeAqSTMlQWnRjSCRsSpTdqd1RSPY0ZJCCjqjhmip6yCponSQOglbJozqa7S4HGD44x1V3W290VxmMELnNnEYk5b24Ok9D4d6q+6xvikkY5pBGdipLwr5PE1P8AtW5n3BBPUREBERAREQEREBERAREQEREBERAREQV92mcYWOltVRaxXRzV7nhjqeHL3M8dWNgR1wSFWlbxVBUyiemtM5qHNbzHzVAazIAGzWjONvnLl3Vgqb1UT9TJUzPP1v8ANdzh7hquvL/9QpHysacOl+SxvpcdvUMnzIP1nHfFYgbFBNTQRNGGtZGdvaV8/wCnHGHX4yafMYgp3SdmkojDq24U8O27Y4i/+Ykfcsr+ze3S+TFePLP7DT9gIQVuOMry+bXcqOirR351scfWHe5d/h3tBoKfiCnrLlSTUUAi5LgDzmxgDAwQAT0329+d269l1zpwX0c0FY0b6R+SefQDkfzKB3e2y0rpaeoifDM0eVHI3S4er3oPSlur6S6UUVbb6hlRTSjLJIzkHfB+0ELZUC7FakTcGGBv9Fq5Y8enD/8AGp6gIiICIiAiIgIiICIiAiIgIiICx1ErIIJJpHNYxjS5znHAAC/Z5RDC+VwJDGk4Heqiv3Ety4guD7MZOVRsGurgdTOilbuC1jiSc+rqN+5BxOFOGjWk3a6txQNe7QwuxzQTnUT83pt3...",
			"numInStock": 9,
			"companyId": 19962
		},]}

```

### GET /product/:id

This endpoint is used to get a specific product by providing the id of the product in the param.

The response:

```JSON
{
	"status": 200,
	"data": {
		"_id": 6544,
		"name": "Belkin GS5 Sport Fit Armband, Black F8M918B1C00",
		"price": "$24.99",
		"body_location": "Arms",
		"category": "Fitness",
		"imageSrc": "data:image/jpeg;base64,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...",
		"numInStock": 9,
		"companyId": 16384
	}
}
```

### PATCH /product/:id/stock

This endpoint is used to update the stock on an item. The body of the request needs this stucture:

```JSON
{
	"numInStock": "9"
}

OR

{
	"numInStock": 9
}

```

It will respond like so :

```JSON
{
	"status": 200,
	"success": true
}
```

### PATCH /products/stock

This endpoint is to update multiple items' stock in one request.

What you need to send it:

```JSON
{
  "products": [
    { "id": 6543, "numInStock": 9 },
    { "id": 6544, "numInStock": 9 }
		//Add more items here
  ]
}
```

What you will receive:

```JSON
{
	"status": 200,
	"success": true
}
```

### GET /companies

This endpoint is used to get all the companies.

Response:

```JSON
{
	"status": 200,
	"data": [
		{
			"_id": 19962,
			"name": "Barska",
			"url": "http://www.barska.com/",
			"country": "United States"
		}]}
```

### GET /company/:id

This endpoint is used to get a specific company

Response:

```JSON
{
	"status": 200,
	"data":
		{
			"_id": 19962,
			"name": "Barska",
			"url": "http://www.barska.com/",
			"country": "United States"
		}
}
```

### GET /cart

This endpoint is used to get the content of the cart

Response:

```JSON
{
	"status": 200,
	"data": [
		{
			"_id": 6543,
			"name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
			"price": "$49.99",
			"imageSrc": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAtAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUIAgH/xABQEAABAwMCAwMGCQgGBgsAAAABAAIDBAUREiEGEzEHQVEiYXGBkcEUFTJScpKhsdEjM0JDYoKTokRFVbLC4RYkNVNj8CUmNDZkZXODlLPx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/...",
			"quantity": 5
		},
		{
			"_id": 6544,
			"name": "Barska Heart Rate Monitor",
			"price": "$45.99",
			"imageSrc": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAtAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUIAgH/xABQEAABAwMCAwMGCQgGBgsAAAABAAIDBAUREiEGEzEHQVEiYXGBkcEUFTJScpKhsdEjM0JDYoKTokRFVbLC4RYkNVNj8CUmNDZkZXODlLPx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQADAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/ALxREQEREBERAREQFz66...",
			"quantity": 5
		}
	]
}

```

### POST /cart/add

This endpoint is used to add items to the cart

Request body:

```JSON
{
	"_id": 6544,
	"name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
	"price": "$49.99",
"imageSrc":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAtAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUIAgH/xABQEAABAwMCAwMGCQgGBgsAAAABAAIDBAUREiEGEzEHQVEiYXGBkcEUFTJScpKhsdEjM0JDYoKTokRFVbLC4RYkNVNj8CUmNDZkZXODlLPx/...",
	"quantity": 5
}
```

Response:

```JSON
{
	"status": 200,
	"message": "Item added successfully"
}

```

### DELETE /cart/remove/:\_id

This endpoint is used to remove items from the cart

response:

```JSON
{
	"status": 200,
	"message": "Item removed from cart successfully!"
}
```

### PATCH /cart/remove/:\_id

This endpoint removes one off an item in the cart

```JSON
{
	"status": 200,
	"message": "Item quantity reduced successfully"
}
```
