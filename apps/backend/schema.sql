CREATE TABLE IF NOT EXISTS generic_name(
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    primary_unit TEXT NOT NULL,
    weight_per_piece INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS pantry(
    id TEXT PRIMARY KEY,
    generic_name_id TEXT NOT NULL UNIQUE,
    quantity INTEGER DEFAULT 0,
    -- unit TEXT,
    is_staple BOOLEAN DEFAULT 0,
    FOREIGN KEY(generic_name_id) REFERENCES generic_name(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS recipes(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    instructions TEXT NOT NULL,
    tags TEXT
);
CREATE TABLE IF NOT EXISTS recipe_ingredients(
    id TEXT,
    ingredient_id TEXT,
    quantity_needed INTEGER,
    unit TEXT,
    FOREIGN KEY(ingredient_id) REFERENCES pantry(id) ON DELETE CASCADE,
    FOREIGN KEY(id) REFERENCES recipes(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS item(
    id TEXT PRIMARY KEY,
    barcode TEXT UNIQUE NOT NULL,
    product_name TEXT,
    generic_name_id TEXT NOT NULL,
    unit_size INTEGER NOT NULL,
    unit_type TEXT NOT NULL,
    FOREIGN KEY(generic_name_id) REFERENCES generic_name(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS allergens(
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS item_allergens(
    item_id TEXT NOT NULL,
    allergen_id TEXT NOT NULL,
    PRIMARY KEY(item_id, allergen_id),
    FOREIGN KEY(item_id) REFERENCES item(id) ON DELETE CASCADE,
    FOREIGN KEY(allergen_id) REFERENCES allergens(id) ON DELETE CASCADE
);
