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
      CREATE UNIQUE INDEX customer_id_key ON public.customer (id);
