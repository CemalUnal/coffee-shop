## Database properties:
- **name**: `coffeeshop`
- **username**: `cemal`
- **password**: `1234`

After creatin the database, create sequence for each table:

- `CREATE SEQUENCE ownerid_seq;`
- `CREATE SEQUENCE productid_seq;`
- `CREATE SEQUENCE customerid_seq;`
- `CREATE SEQUENCE orderid_seq;`

Then create the tables with the following order:

#### _owner_ table

	CREATE TABLE public.owner (
	   id int2 DEFAULT nextval('ownerid_seq'::regclass) NOT NULL,
       realname varchar(50) NOT NULL,
       surname varchar(50) NOT NULL,
       username varchar(50) NOT NULL,
       password varchar(3000) NOT NULL
    );
    CREATE UNIQUE INDEX owner_id_key ON public.owner (id);

#### _customer_ table

    CREATE TABLE public.customer (
  	   id int2 DEFAULT nextval('customerid_seq'::regclass) NOT NULL,
         realname varchar(50) NOT NULL,
         surname varchar(50) NOT NULL,
         username varchar(50) NOT NULL,
         password varchar(3000) NOT NULL,
         floorno int4 NOT NULL,
         buildingno int4 NOT NULL,
         roomno int4 NOT NULL
      );
      CREATE UNIQUE INDEX customer_id_key ON public.customer (id);

#### _product_ table

    CREATE TABLE public.product (
  	   id int2 DEFAULT nextval('productid_seq'::regclass) NOT NULL,
         productname varchar(50) NOT NULL
      );
      CREATE UNIQUE INDEX product_id_key ON public.product (id);

#### _orders_ table

    CREATE TABLE public.orders (
  	   id int2 DEFAULT nextval('orderid_seq'::regclass) NOT NULL,
         neworsent varchar(4) NOT NULL,
         customer_id int2 NOT NULL,
         product_id int2 NOT NULL,
         CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id),
         CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id)
      );
      CREATE UNIQUE INDEX order_id_key ON public.orders (id);

## Some example request to REST API:

### Orders
#### Add order
Send **POST** request to localhost:8080/orders/makeorder and the body is:

```json
{
  "newOrSent": "sent",
  "customer": {
  	  "id": 6,
	  "username": "customer1",
	  "password": "1234",
	  "realname": "gulsen",
	  "surname": "aktepe",
	  "floorno": "1",
	  "buildingno": "5",
	  "roomno": "7"
  },
  "product": {
  	"id": 4,
	"productname": "oralet"
  }
}
```

The example response is
```json
{
    "message": "CREATED: Your order is created successfully!",
    "data": {
        "id": 20,
        "orderdate": "15-05-2018 10:54:51",
        "customer": {
            "id": 6,
            "username": "customer1",
            "realname": "gulsen",
            "surname": "aktepe",
            "password": "1234",
            "floorno": 1,
            "buildingno": 5,
            "roomno": 7,
            "orders": [],
            "new": false
        },
        "product": {
            "id": 4,
            "productname": "oralet",
            "orders": [],
            "new": false
        },
        "newOrSent": "sent",
        "new": false
    }
}
```

#### Get Order by its id

Send **GET** request to localhost:8080/orders/21

The example response is

```json
{
    "message": "SUCCESS!",
    "data": {
        "id": 21,
        "orderdate": "15-05-2018 11:18:04",
        "customer": {
            "id": 6,
            "username": "customer1",
            "realname": "gulsen",
            "surname": "aktepe",
            "password": "1234",
            "floorno": 1,
            "buildingno": 5,
            "roomno": 7,
            "orders": [
                21,
                {
                    "id": 20,
                    "orderdate": "15-05-2018 10:54:51",
                    "customer": 6,
                    "product": {
                        "id": 4,
                        "productname": "oralet",
                        "orders": [
                            20
                        ],
                        "new": false
                    },
                    "newOrSent": "sent",
                    "new": false
                }
            ],
            "new": false
        },
        "product": {
            "id": 8,
            "productname": "qwqsdfsdv",
            "orders": [
                21
            ],
            "new": false
        },
        "newOrSent": "sent",
        "new": false
    }
}
```

#### Get orders by Customer id

Send **GET** request to localhost:8080/orders/bycustomer/6

The example response is

```json
{
    "message": "SUCCESS!",
    "data": [
        {
            "id": 20,
            "orderdate": "15-05-2018 10:54:51",
            "customer": {
                "id": 6,
                "username": "customer1",
                "realname": "gulsen",
                "surname": "aktepe",
                "password": "1234",
                "floorno": 1,
                "buildingno": 5,
                "roomno": 7,
                "orders": [
                    20,
                    {
                        "id": 21,
                        "orderdate": "15-05-2018 11:18:04",
                        "customer": 6,
                        "product": {
                            "id": 8,
                            "productname": "qwqsdfsdv",
                            "orders": [
                                21
                            ],
                            "new": false
                        },
                        "newOrSent": "sent",
                        "new": false
                    }
                ],
                "new": false
            },
            "product": {
                "id": 4,
                "productname": "oralet",
                "orders": [
                    20
                ],
                "new": false
            },
            "newOrSent": "sent",
            "new": false
        },
        21
    ]
}
```
If there is more than one order for the current user, response object contains only the id of the orders but not Order object itself. I could not solve it yet, but you can send a GET request again with the order id to retrieve this Order object.

#### Get orders by Customer id

Send **PUT** request to localhost:8080/orders/editorder/21

Example body is:

```json
{
  "newOrSent": "new"
}
```
Sending only newOrSent is enough.
