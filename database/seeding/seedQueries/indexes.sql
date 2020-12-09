\c sdc

CREATE INDEX prodIdx ON products (id DESC NULLS LAST);
CREATE INDEX categoryx ON products (category_id);
CREATE INDEX typex ON products (type_id);