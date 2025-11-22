// import http from 'k6/http';
// import { sleep, check } from 'k6';

// export let options = {
//   vus: 10,       // Virtual users
//   duration: '10s',  // Test duration
// };

// export default function () {
//   let res = http.get('/');

//   check(res, {
//     'status is 200': r => r.status === 200,
//   });

//   sleep(1);
// }

// import http from 'k6/http';
// import { sleep } from 'k6';

// export let options = {
//   vus: 10,          // 10 virtual users
//   duration: '30s',  // test for 30 seconds
// };

// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// }


import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 2,
  duration: '10s',
};

export default function () {
  const url = 'https://test.k6.io/login.php'; 
  const payload = { login: 'admin', password: '123' };
  const res = http.post(url, payload, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

  const ok = check(res, {
    'login status is 200': (r) => r.status === 200,
  });

  if (!ok) {
    console.log(`FAIL status=${res.status} url=${url}`);
    // Print short response body for diagnosis (trim to 500 chars)
    console.log('body:', res.body ? res.body.slice(0, 500) : 'no body');
  }

  sleep(1);
}
