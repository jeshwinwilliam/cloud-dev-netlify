const { neon } = require('@neondatabase/serverless');

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== 'DELETE') {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Method not allowed. Use DELETE.' })
      };
    }

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'DATABASE_URL is not set.' })
      };
    }

    const id = event.queryStringParameters && event.queryStringParameters.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Visitor id is required.' })
      };
    }

    const sql = neon(databaseUrl);
    const deleted = await sql`
      DELETE FROM visitors
      WHERE id = ${id}
      RETURNING id, name, visited_at;
    `;

    if (deleted.length === 0) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Visitor not found.' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Visitor deleted successfully.', deleted: deleted[0] })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to delete visitor.', details: error.message })
    };
  }
};
