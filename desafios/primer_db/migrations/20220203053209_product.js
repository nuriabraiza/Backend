exports.up = function (knex) {
	return knex.schema.createTable("product", (table) => {
		table.increments("id").primary().unique(true).notNull();
		table.string("title").notNull();
		table.float("price");
		table.string("thumbnail");
		table.timestamp("created_at_utc").defaultTo(knex.fn.now());
		table.timestamp("updated_at_utc");
		table.index(["id", "title"], "index_product");
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable("product");
};
