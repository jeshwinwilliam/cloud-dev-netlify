const { neon } = require('@neondatabase/serverless');

exports.handler = async function (event) {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    const sql = neon(databaseUrl);

    const id = event.queryStringParameters.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "ID required" })
      };
    }

    await sql`
      DELETE FROM visitors
      WHERE id = ${id};
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Visitor deleted" })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};