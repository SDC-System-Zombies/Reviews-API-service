# Atelier-Backend-API-service
Rebuild on an online retail database service and caled up the backend system of an e-commerce website that can withstand outstanding increased traffic.

## Tech Stack
- PostgreSQL
- Express.js / Fastify
- Node.js
- Docker
- NginX
- Reids
- Load testing: Loader.io, K6, New Relic

## Example of API Services:
###List Reviews
Returns a list of reviews for a particular product. This list does not include any reported reviews.

####GET /reviews/

- QueryParameters

|Parameter	 | Type |	Description  |
-------------|------|--------------|
|page|	integer|	Selects the page of results to return. Default 1.|
|count|	integer|	Specifies how many results per page to return. Default 5.|
|sort|	text|	Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"|
|product_id|	integer|	Specifies the product for which to retrieve reviews.|

- Response

Status: 200 OK

```
{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
    // ...
  ]
}
```
