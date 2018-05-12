

* Create a database with **bbm488Odev4**

* `CREATE SEQUENCE ownerid_seq;
CREATE TABLE public.owner (
    ownerid smallint NOT NULL DEFAULT nextval('ownerid_seq'),
    realname varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    username varchar(50) NOT NULL,
    password varchar(3000) NOT NULL
) ;
ALTER SEQUENCE ownerid_seq OWNED BY owner.ownerid;`
