import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let options = {
  thresholds: {
    // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
  stages: [
    { duration: '3m', target: 250},
    { duration: '3m', target: 250},
    { duration: '3m', target: 500 },
    { duration: '3m', target: 500 },
    { duration: '6m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  let max = 10000000;
  let min = 9000000;
  let id = Math.floor(Math.random() * (max - min + 1) + min);
  let url = 'http://localhost:9999/api/carousel';
  let headers = { 'Content-Type': 'application/json' };
  let data = {
    name: 'oreos',
    price: '5.00',
    image: 'https://loremflickr.com/320/240/cookie',
    featured: false,
    visited: false,
    categoryId: 10,
    typeId: 10
  };
  http.get(`http://localhost:9999/api/carousel/${id}/moreToConsider`);
  http.get(`http://localhost:9999/api/carousel/${id}/similar`);
  http.get(`http://localhost:9999/api/carousel/${id}/featured`);
  http.post(url, JSON.stringify(data), { headers: headers });
  /* let responses = http.batch([
    ['GET', `http://localhost:9999/api/carousel/${id}/moreToConsider`],
    ['GET', `http://localhost:9999/api/carousel/${id}/similar`],
    ['GET', `http://localhost:9999/api/carousel/${id}/featured`],
    ['POST', url, data, { headers: headers }]
  ]); */
  sleep(1);
}