let environment = 'local';

const config = {
    localUrl: 'http://62.173.43.41:9080/api',
    testUrl: '',
    liveUrl: '',
    getriPayTest: '',
    getriPayLive: '',
};

const url =
    environment === 'local'
        ? config.localUrl
        : environment === 'development'
        ? config.testUrl
        : config.liveUrl;

export {url, config};
