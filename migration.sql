
CREATE TABLE public.spinner (
    id integer NOT NULL,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    name character varying(255) NOT NULL,
    tokens integer DEFAULT 1,
    condition text
);


CREATE SEQUENCE public.spinner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.spinner_id_seq OWNED BY public.spinner.id;


CREATE TABLE public.spinner_variation (
    id integer NOT NULL,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    spinner integer,
    type character varying(255) DEFAULT 'text'::character varying,
    content text
);


CREATE SEQUENCE public.spinner_variation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.spinner_variation_id_seq OWNED BY public.spinner_variation.id;


ALTER TABLE ONLY public.spinner ALTER COLUMN id SET DEFAULT nextval('public.spinner_id_seq'::regclass);


ALTER TABLE ONLY public.spinner_variation ALTER COLUMN id SET DEFAULT nextval('public.spinner_variation_id_seq'::regclass);


COPY public.spinner (id, status, date_created, date_updated, name, tokens, condition) FROM stdin;
1	published	2022-04-25 15:46:47.81+00	\N	test	1	\N
\.


--
-- Data for Name: spinner_variation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spinner_variation (id, date_created, date_updated, spinner, type, content) FROM stdin;
1	2022-04-25 15:46:47.815+00	\N	1	text	aa
2	2022-04-25 15:46:47.824+00	\N	1	text	bb
\.


SELECT pg_catalog.setval('public.spinner_id_seq', 1, true);

SELECT pg_catalog.setval('public.spinner_variation_id_seq', 2, true);

ALTER TABLE ONLY public.spinner
    ADD CONSTRAINT spinner_name_unique UNIQUE (name);

ALTER TABLE ONLY public.spinner
    ADD CONSTRAINT spinner_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.spinner_variation
    ADD CONSTRAINT spinner_variation_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.spinner_variation
    ADD CONSTRAINT spinner_variation_spinner_foreign FOREIGN KEY (spinner) REFERENCES public.spinner(id) ON DELETE CASCADE;



INSERT INTO public.directus_collections VALUES ('spinner', NULL, NULL, NULL, false, false, NULL, 'status', false, 'archived', 'draft', NULL, 'all', NULL, NULL, NULL, NULL, 'open');
INSERT INTO public.directus_collections VALUES ('spinner_variation', NULL, NULL, NULL, false, false, NULL, NULL, false, NULL, NULL, NULL, 'all', NULL, NULL, NULL, NULL, 'open');


INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner', 'status', NULL, 'select-dropdown', '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}', 'labels', '{"showAsDot":true,"choices":[{"text":"$t:published","value":"published","foreground":"#FFFFFF","background":"var(--primary)"},{"text":"$t:draft","value":"draft","foreground":"#18222F","background":"#D3DAE4"},{"text":"$t:archived","value":"archived","foreground":"#FFFFFF","background":"var(--warning)"}]}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner', 'name', NULL, 'input', NULL, NULL, NULL, false, false, NULL, 'half', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner', 'tokens', NULL, 'input', NULL, NULL, NULL, false, false, NULL, 'half', NULL, NULL, NULL, true, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner', 'condition', NULL, 'input-code', NULL, NULL, NULL, false, false, NULL, 'fill', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner', 'spinners', 'o2m', 'list-o2m', '{"template":"{{type}} - {{content}}"}', 'related-values', '{"template":"{{type}} - {{content}}"}', false, false, NULL, 'fill', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner_variation', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner_variation', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner_variation', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner_variation', 'spinner', 'm2o', NULL, NULL, NULL, NULL, false, false, NULL, 'half', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner_variation', 'type', NULL, 'select-dropdown', '{"choices":[{"text":"text","value":"text"},{"text":"html","value":"html"},{"text":"markdown","value":"markdown"}]}', NULL, NULL, false, false, NULL, 'half', NULL, NULL, NULL, false, NULL, NULL, NULL);
INSERT INTO public.directus_fields VALUES (nextval('directus_fields_id_seq'::regclass), 'spinner_variation', 'content', NULL, 'input-code', NULL, NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL, NULL, NULL);



INSERT INTO public.directus_relations VALUES (nextval('directus_relations_id_seq'::regclass), 'spinner_variation', 'spinner', 'spinner', 'spinners', NULL, NULL, NULL, NULL, 'delete');


