exports.up = function (knex) {
	return knex.schema.createTable("message", (table) => {
		table.increments("id").primary().unique(true).notNull();
		table.string("user", 4).notNull();
		table.string("text");
		table.timestamp("created_at_utc").defaultTo(knex.fn.now());
		table.timestamp("updated_at_utc");
		table.index(["id", "user"], "index_message");
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable("message");
};
