const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // GET - verify password
    if (event.httpMethod === 'GET') {
      const password = event.queryStringParameters?.password;
      if (!password) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing password' }) };
      }

      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();

      if (error) throw error;

      const valid = data.value === password;
      return { statusCode: 200, headers, body: JSON.stringify({ valid }) };
    }

    // POST - update password
    if (event.httpMethod === 'POST') {
      const { currentPassword, newPassword } = JSON.parse(event.body);

      // Verify current password first
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();

      if (error) throw error;
      if (data.value !== currentPassword) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'Contraseña actual incorrecta.' }) };
      }

      // Update password
      const { error: updateError } = await supabase
        .from('settings')
        .update({ value: newPassword })
        .eq('key', 'admin_password');

      if (updateError) throw updateError;

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
