const { neon } = require('@neondatabase/serverless');

exports.handler = async function () {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'DATABASE_URL is not set.' })
      };
    }

    const sql = neon(databaseUrl);
    const visitors = await sql`
      SELECT id, name, visited_at
      FROM visitors
      ORDER BY visited_at DESC;
    `;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitors)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch visitors.', details: error.message })
    };
  }
};
