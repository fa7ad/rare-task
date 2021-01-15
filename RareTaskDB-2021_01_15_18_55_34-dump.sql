--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    "listingId" integer NOT NULL,
    comment text NOT NULL
);


ALTER TABLE public."Comment" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comment_id_seq" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: Healthcheck; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Healthcheck" (
    id integer NOT NULL,
    "timestamp" integer NOT NULL
);


ALTER TABLE public."Healthcheck" OWNER TO postgres;

--
-- Name: Healthcheck_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Healthcheck_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Healthcheck_id_seq" OWNER TO postgres;

--
-- Name: Healthcheck_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Healthcheck_id_seq" OWNED BY public."Healthcheck".id;


--
-- Name: Listing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Listing" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    "userId" integer NOT NULL,
    rating numeric(65,30) DEFAULT 0,
    type text NOT NULL,
    dates_available jsonb NOT NULL,
    images text[],
    price numeric(65,30) DEFAULT 0 NOT NULL
);


ALTER TABLE public."Listing" OWNER TO postgres;

--
-- Name: Listing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Listing_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Listing_id_seq" OWNER TO postgres;

--
-- Name: Listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Listing_id_seq" OWNED BY public."Listing".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    full_name text NOT NULL,
    avatar text,
    role text DEFAULT 'user'::text,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: Healthcheck id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Healthcheck" ALTER COLUMN id SET DEFAULT nextval('public."Healthcheck_id_seq"'::regclass);


--
-- Name: Listing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listing" ALTER COLUMN id SET DEFAULT nextval('public."Listing_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Comment" (id, "listingId", comment) VALUES (1, 1, 'We hated your smelly shitty house');
INSERT INTO public."Comment" (id, "listingId", comment) VALUES (2, 2, 'We liked the stay');
INSERT INTO public."Comment" (id, "listingId", comment) VALUES (3, 3, 'We loved your house');
INSERT INTO public."Comment" (id, "listingId", comment) VALUES (4, 4, 'We hated your house');


--
-- Data for Name: Healthcheck; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Listing" (id, title, description, city, country, "userId", rating, type, dates_available, images, price) VALUES (2, 'Private Room- 1Double & 1Single Bed-Central London', 'A Private Room in Shared flat with a friendly professional female and her two lovable pugs(dogs).I look forward to hosting you in my home and welcoming you to London', 'Berlin', 'Germany', 2, 3.000000000000000000000000000000, 'single', '{"max_date": "2021-04-01", "min_date": "2021-01-01"}', '{https://a0.muscache.com/4ea/air/v2/pictures/1b66acbb-f665-43c5-a505-794a4f343e6b.jpg}', 200.000000000000000000000000000000);
INSERT INTO public."Listing" (id, title, description, city, country, "userId", rating, type, dates_available, images, price) VALUES (3, 'Private Room- 1Double & 1Single Bed-Central London', 'A Private Room in Shared flat with a friendly professional female and her two lovable pugs(dogs).I look forward to hosting you in my home and welcoming you to London', 'London', 'UK', 1, 2.000000000000000000000000000000, 'single', '{"max_date": "2021-04-01", "min_date": "2021-01-01"}', '{https://a0.muscache.com/4ea/air/v2/pictures/7fbb6427-c0f2-4336-b491-b21d2c866c39.jpg}', 200.000000000000000000000000000000);
INSERT INTO public."Listing" (id, title, description, city, country, "userId", rating, type, dates_available, images, price) VALUES (4, 'Private Room- 1Double & 1Single Bed-Central London', 'A Private Room in Shared flat with a friendly professional female and her two lovable pugs(dogs).I look forward to hosting you in my home and welcoming you to London', 'Kiev', 'Ukraine', 2, 1.000000000000000000000000000000, 'single', '{"max_date": "2021-04-01", "min_date": "2021-01-01"}', '{https://a0.muscache.com/4ea/air/v2/pictures/4973ce42-d15c-4f6d-9cc3-dd0d52b60261.jpg}', 200.000000000000000000000000000000);
INSERT INTO public."Listing" (id, title, description, city, country, "userId", rating, type, dates_available, images, price) VALUES (1, 'Private Room- 1Double & 1Single Bed-Central London', 'A Private Room in Shared flat with a friendly professional female and her two lovable pugs(dogs).I look forward to hosting you in my home and welcoming you to London', 'London', 'UK', 1, 4.000000000000000000000000000000, 'single', '{"max_date": "2021-04-01", "min_date": "2021-01-01"}', '{https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png,https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png,https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png,https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png,https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png}', 200.000000000000000000000000000000);


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" (id, username, full_name, avatar, role, password) VALUES (1, 'fa7ad', 'Fahad Hossain', 'https://seeklogo.com/images/P/prisma-logo-3805665B69-seeklogo.com.png', 'admin', '$argon2i$v=19$m=4096,t=3,p=1$7dR5giz538C7KyCknp+uYQ$d9hm8/+A8BtiGh5s5jJ6INUO3mVYlXo9kkBadjLjeRE');
INSERT INTO public."User" (id, username, full_name, avatar, role, password) VALUES (2, 'fa7ad2', 'Fahad Hossain', 'https://seeklogo.com/images/P/prisma-logo-3805665B69-seeklogo.com.png', 'user', '$argon2i$v=19$m=4096,t=3,p=1$/10aN6pWW4ZmkiFAky0UEQ$L0tQa6TyL5KYqtLf1dXd+F4gO5hUidxA+ilbe7wflW4');


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('a2d31956-c075-4d0c-ad45-a676354d6f65', '51a55e6dff082762570b8138998b1cdd685a828f49fce11dd2ab6e41e3283ee', '2021-01-15 09:51:59.535911+00', '20210113141815_healthcheck', NULL, NULL, '2021-01-15 09:51:59.511361+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c4eaccd1-a676-45a8-87f2-1c3ce838a21d', '9f9cf09fc22e6666d75e3165dfb6d509d582c8f3e1b48f1d6c85f1612ab266', '2021-01-15 09:51:59.665155+00', '20210113164915_listing_user_comment', NULL, NULL, '2021-01-15 09:51:59.543955+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('653c7543-ec43-471d-8ec4-7423b476040f', '62139419953ce1cd4b79f9c183f042716b9b0f1bd463f2bb6f8afde14f3efad', '2021-01-15 09:51:59.69199+00', '20210113165303_role_rating_optionals', NULL, NULL, '2021-01-15 09:51:59.673332+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('8e3a7b47-426e-4914-8ab4-ede245e067f4', 'eb7b8daec0ee3644749897ffa29c96c41df26fac64762d6285882b2cbf3c99d', '2021-01-15 09:51:59.717176+00', '20210113165636_user_password', NULL, NULL, '2021-01-15 09:51:59.700624+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('1806a7d7-2aad-4f6c-aa9d-c7ff47c73dc6', 'dd8f85b9e5d3349bdde16113cc3b489b204a33c3938b34b9cbd7e5463713e3', '2021-01-15 09:51:59.751927+00', '20210113195052_fts', NULL, NULL, '2021-01-15 09:51:59.725435+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f9565b1e-073e-4a92-8c3a-94c341479656', 'fb81abab8a0d53e2c7d36fe6a26b53a138679ccddb27507bddd9b78d79d460', '2021-01-15 09:51:59.778502+00', '20210114112147_image_type_date', NULL, NULL, '2021-01-15 09:51:59.760649+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('a442455b-62d3-49f6-8208-376950676be8', 'b696c01536a662ea582ac9234d21e6db5d65ef2a2603ceec14e17e542fac7d1', '2021-01-15 09:51:59.804003+00', '20210114161628_price', NULL, NULL, '2021-01-15 09:51:59.786628+00', 1);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 1, false);


--
-- Name: Healthcheck_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Healthcheck_id_seq"', 1, false);


--
-- Name: Listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Listing_id_seq"', 4, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Healthcheck Healthcheck_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Healthcheck"
    ADD CONSTRAINT "Healthcheck_pkey" PRIMARY KEY (id);


--
-- Name: Listing Listing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listing"
    ADD CONSTRAINT "Listing_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User.username_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User.username_unique" ON public."User" USING btree (username);


--
-- Name: text_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX text_index ON public."Listing" USING btree (title, description, city, country);


--
-- Name: Comment Comment_listingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES public."Listing"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Listing Listing_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listing"
    ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

