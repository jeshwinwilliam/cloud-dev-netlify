const { neon } = require('@neondatabase/serverless');

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
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

    const { name } = JSON.parse(event.body || '{}');

    if (!name || !name.trim()) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Name is required.' })
      };
    }

    const sql = neon(databaseUrl);
    const inserted = await sql`
      INSERT INTO visitors (name)
      VALUES (${name.trim()})
      RETURNING id, name, visited_at;
    `;

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inserted[0])
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to add visitor.', details: error.message })
    };
  }
};
