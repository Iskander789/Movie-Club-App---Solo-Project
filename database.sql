CREATE TABLE session (
    sid character varying PRIMARY KEY,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    email character varying(255),
    profile_picture character varying(255),
    group_name character varying(80),
    is_leader boolean DEFAULT false
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_members (
    user_id integer REFERENCES "user"(id) ON DELETE CASCADE,
    group_id integer REFERENCES groups(id) ON DELETE CASCADE,
    is_leader boolean DEFAULT false,
    CONSTRAINT group_members_pkey PRIMARY KEY (user_id, group_id)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    group_id integer NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    text text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

