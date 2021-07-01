import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  let rNumber = Math.floor(Math.random() * 13025);
  let res = http.get(`http://127.0.0.1:3000/reviews?product_id=${rNumber}`);
  check(res, {
    'response time < 50ms': (r) => r.timings.duration < 50
  })
  sleep(1);
}
