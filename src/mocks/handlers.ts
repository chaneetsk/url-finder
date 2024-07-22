import { http, HttpResponse } from 'msw'
 
export const handlers = [
  // Intercept "GET https://infotrack-tests.infotrack.com.au/Google/Page01.html -- /Page05.html" requests...
  http.get('https://infotrack-tests.infotrack.com.au/Google/Page01.html', () => {
    return HttpResponse.text('<body><div class="g"><a href="www.infotrack.com.au"/></div></body>', { status: 200 })
  }),
  http.get('https://infotrack-tests.infotrack.com.au/Google/Page02.html', () => {
    return HttpResponse.text('<body><div class="g"><a href="www.infotrack.com.au"/></div></body>', { status: 200 })
  }),
  http.get('https://infotrack-tests.infotrack.com.au/Google/Page03.html', () => {
    return HttpResponse.text('<body><div class="g"><a href="www.infotrack.com"/></div></body>', { status: 200 })
  }),
  http.get('https://infotrack-tests.infotrack.com.au/Google/Page04.html', () => {
    return HttpResponse.text('<body><div class="g"><a href="www.infotrack.com.au"/></div></body>', { status: 200 })
  }),
  http.get('https://infotrack-tests.infotrack.com.au/Google/Page05.html', () => {
    return HttpResponse.text('<body><div class="g"><a href="www.infotrack.com"/></div></body>', { status: 200 })
  }),
  // Intercept "GET https://infotrack-tests.infotrack.com.au/Bing/Page01.html -- /Page05.html" requests...
  http.get('https://infotrack-tests.infotrack.com.au/Bing/Page01.html', () => {
    return HttpResponse.text('<body><div class="b_algo"><a href="www.infotrack.com.au"/></div></body>', { status: 200 })
  }),
  http.get('https://infotrack-tests.infotrack.com.au/Bing/Page02.html', () => {
    return HttpResponse.text('<body><div class="b_algo"><a href="www.infotrack.com"/></div></body>', { status: 200 })
  }),
  http.get('https://infotrack-tests.infotrack.com.au/Bing/Page03.html', () => {
    return HttpResponse.text('<body><div class="b_algo"><a href="www.infotrack.com"/></div></body>', { status: 200 })
  }),
  http.get('https://infotrack-tests.infotrack.com.au/Bing/Page04.html', () => {
    return HttpResponse.text('<body><div class="b_algo"><a href="www.infotrack.com"/></div></body>', { status: 200 })
  }),
  http.get('https://infotrack-tests.infotrack.com.au/Bing/Page05.html', () => {
    return HttpResponse.text('<body><div class="b_algo"><a href="www.infotrack.com.au"/></div></body>', { status: 200 })
  })
]
