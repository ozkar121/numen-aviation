const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // GET - obtener todos los vuelos
    if (event.httpMethod === 'GET') {
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // POST - crear vuelo
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const { data, error } = await supabase
        .from('flights')
        .insert([body])
        .select();

      if (error) throw error;
      return { statusCode: 201, headers, body: JSON.stringify(data[0]) };
    }

    // PUT - actualizar vuelo
    if (event.httpMethod === 'PUT') {
      const body = JSON.parse(event.body);
      const id = event.queryStringParameters?.id;
      const { data, error } = await supabase
        .from('flights')
        .update(body)
        .eq('id', id)
        .select();

      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify(data[0]) };
    }

    // DELETE - eliminar vuelo
    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;
      const { error } = await supabase
        .from('flights')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
