import Fetch from 'helpers/Fetch';
import Sinon from 'sinon';

describe('fetch', () => {
  var xhr;
  var requests = [];
  beforeAll(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  it('handles null arguments', async () => {
    expect.assertions(5);

    await expect(Fetch()).resolves.toEqual(null);

    await expect(Fetch('string')).resolves.toEqual(null);

    var promise = Fetch(new Request('/'));
    requests.pop().respond(
      200,
    );
    await expect(promise).resolves.toHaveProperty('ok', true);

    promise = Fetch(new Request('/'), {
      onUnauthorized: 'string',
    });
    requests.pop().respond(
      401,
    );
    await expect(promise).resolves.toHaveProperty('ok', false);

    promise = Fetch(new Request('/'), {
      onNewToken: 'string',
    });
    requests.pop().respond(
      200,
      {
        'access-token': 'wwwww',
        'token-type': 'Bearer',
        client: 'xxxxx',
        expiry: 'yyyyy',
        uid: 'zzzzz',
      }
    );
    await expect(promise).resolves.toHaveProperty('ok', true);
  });

  it('makes requests to non-authenticated routes', async () => {
    expect.assertions(4);

    // 2xx response
    var onUnauthorizedMock = Sinon.expectation.create([]);
    onUnauthorizedMock.never();
    var onNewTokenMock = Sinon.expectation.create([]);
    onNewTokenMock.never();
    var promise = Fetch(new Request('/', {
      headers: {
        'Content-Type': 'application/json',
      },
    }), {
      onUnauthorized: onUnauthorizedMock,
      onNewToken: onNewTokenMock,
    });
    requests.pop().respond(
      200,
    );
    await expect(promise).resolves.toHaveProperty('ok', true);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();

    // with token
    onUnauthorizedMock = Sinon.expectation.create([]);
    onUnauthorizedMock.never();
    onNewTokenMock = Sinon.expectation.create([]);
    onNewTokenMock.never();
    promise = Fetch(new Request('/', {
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'wwwww',
        'token-type': 'Bearer',
        client: 'xxxxx',
        expiry: 'yyyyy',
        uid: 'zzzzz',
      },
    }), {
      onUnauthorized: onUnauthorizedMock,
      onNewToken: onNewTokenMock,
    });
    requests.pop().respond(
      422,
    );
    await expect(promise).resolves.toHaveProperty('ok', false);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();

    // 4xx response non-401 response
    onUnauthorizedMock = Sinon.expectation.create([]);
    onUnauthorizedMock.never();
    onNewTokenMock = Sinon.expectation.create([]);
    onNewTokenMock.never();
    promise = Fetch(new Request('/', {
      headers: {
        'Content-Type': 'application/json',
      },
    }), {
      onUnauthorized: onUnauthorizedMock,
      onNewToken: onNewTokenMock,
    });
    requests.pop().respond(
      422,
    );
    await expect(promise).resolves.toHaveProperty('ok', false);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();

    // no callbacks provided
    promise = Fetch(new Request('/', {
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    requests.pop().respond(
      200,
    );
    await expect(promise).resolves.toHaveProperty('ok', true);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();
  });

  it('runs specific callback for requests to authenticated routes with invalid authentication', async () => {
    expect.assertions(3);

    // 401 response
    var onUnauthorizedMock = Sinon.expectation.create([]);
    onUnauthorizedMock.once();
    var onNewTokenMock = Sinon.expectation.create([]);
    onNewTokenMock.never();
    var promise = Fetch(new Request('/protected', {
      headers: {
        'Content-Type': 'application/json',
      },
    }), {
      onUnauthorized: onUnauthorizedMock,
      onNewToken: onNewTokenMock,
    });
    requests.pop().respond(
      401,
    );
    await expect(promise).resolves.toHaveProperty('ok', false);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();

    // with token
    onUnauthorizedMock = Sinon.expectation.create([]);
    onUnauthorizedMock.once();
    onNewTokenMock = Sinon.expectation.create([]);
    onNewTokenMock.never();
    promise = Fetch(new Request('/protected', {
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'wwwww',
        'token-type': 'Bearer',
        client: 'xxxxx',
        expiry: 'yyyyy',
        uid: 'zzzzz',
      },
    }), {
      onUnauthorized: onUnauthorizedMock,
      onNewToken: onNewTokenMock,
    });
    requests.pop().respond(
      401,
    );
    await expect(promise).resolves.toHaveProperty('ok', false);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();

    // no callbacks provided
    promise = Fetch(new Request('/protected', {
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    requests.pop().respond(
      401,
    );
    await expect(promise).resolves.toHaveProperty('ok', false);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();
  });

  it('makes requests to authenticated routes with valid authentication', async () => {
    expect.assertions(3);

    // 2xx response
    var onUnauthorizedMock = Sinon.expectation.create([]);
    onUnauthorizedMock.never();
    var onNewTokenMock = Sinon.expectation.create([]);
    var newToken = {
      'access-token': 'newAccessToken',
      'token-type': 'Bearer',
      client: 'newClient',
      expiry: '99999',
      uid: 'zzzzz',
    }
    onNewTokenMock.once().withExactArgs({
      accessToken: newToken['access-token'],
      tokenType: newToken['token-type'],
      client: newToken.client,
      expiry: newToken.expiry,
      uid: newToken.uid,
    });
    var promise = Fetch(new Request('/protected', {
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'wwwww',
        'token-type': 'Bearer',
        client: 'xxxxx',
        expiry: 'yyyyy',
        uid: 'zzzzz',
      },
    }), {
      onUnauthorized: onUnauthorizedMock,
      onNewToken: onNewTokenMock,
    });
    requests.pop().respond(
      200,
      newToken,
    );
    await expect(promise).resolves.toHaveProperty('ok', true);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();

    // 4xx response non-401 response
    var onUnauthorizedMock = Sinon.expectation.create([]);
    onUnauthorizedMock.never();
    onNewTokenMock = Sinon.expectation.create([]);
    onNewTokenMock.once().withExactArgs({
      accessToken: newToken['access-token'],
      tokenType: newToken['token-type'],
      client: newToken.client,
      expiry: newToken.expiry,
      uid: newToken.uid,
    });
    var promise = Fetch(new Request('/protected', {
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'wwwww',
        'token-type': 'Bearer',
        client: 'xxxxx',
        expiry: 'yyyyy',
        uid: 'zzzzz',
      },
    }), {
      onUnauthorized: onUnauthorizedMock,
      onNewToken: onNewTokenMock,
    });
    requests.pop().respond(
      422,
      newToken,
    );
    await expect(promise).resolves.toHaveProperty('ok', false);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();

    // no callbacks provided
    promise = Fetch(new Request('/protected', {
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'wwwww',
        'token-type': 'Bearer',
        client: 'xxxxx',
        expiry: 'yyyyy',
        uid: 'zzzzz',
      },
    }));
    requests.pop().respond(
      200,
    );
    await expect(promise).resolves.toHaveProperty('ok', true);
    onUnauthorizedMock.verify();
    onNewTokenMock.verify();
  });
});
