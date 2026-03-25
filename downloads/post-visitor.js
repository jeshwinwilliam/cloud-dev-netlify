const { neon } = require('@neondatabase/serverless');

exports.handler = async function (event) {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    const sql = neon(databaseUrl);

    const body = JSON.parse(event.body);
    const { name } = body;

    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Name is required" })
      };
    }

    const result = await sql`
      INSERT INTO visitors (name)
      VALUES (${name})
      RETURNING *;
    `;

    return {
      statusCode: 200,
      body: JSON.stringify(result[0])
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};