import Sinon from 'sinon';

import SiteFetcher from 'mixins/fetchers/SiteFetcher';


describe('site fetcher', () => {
  let xhr;
  let requests = [];
  beforeAll(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterAll(() => {
    xhr.restore();
  });

  it('create with valid site POSTS to /users/current/sites proper data in proper format', () => {
    const site = {
      id: 1,
      title: 'Site 1',
      url: 'http://www.site1.com/',
    };
    SiteFetcher.create(site);

    const request = requests.pop();
    expect(request.requestHeaders['content-type']).toContain('application/json');
    expect(request.requestBody).toEqual(JSON.stringify({ site: site }));
    expect(request.method).toEqual('POST');
    request.respond(200);
  });

  it('create resolves created site on 2xx response', async () => {
    const site = {
      id: 1,
      title: 'Site 1',
      url: 'http://www.site1.com/',
    };
    const siteFetcherPromise = SiteFetcher.create(site);

    const request = requests.pop();
    request.respond(
      200,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(site),
    );

    await expect(siteFetcherPromise).resolves.toEqual(site);
  });

  it('create resolves null on non-2xx response', async () => {
    const site = {
      id: 1,
      title: 'Site 1',
      url: 'http://www.site1.com/',
    };
    const siteFetcherPromise = SiteFetcher.create(site);

    const request = requests.pop();
    request.respond(
      409,
      {
        'Content-Type': 'application/json',
      },
    );

    await expect(siteFetcherPromise).resolves.toBe(null);
  });

  it('create rejects on network errors', () => {
    // TODO how to test fetch network errors?
  });
});
