const cacheName = 'v1'

const cacheClone = async (e:any) => {
    const res = await fetch(e.request);
    const resClone = res.clone();
  
    const cache = await caches.open(cacheName);
    await cache.put(e.request, resClone);
    return res;
  };

// install
const installWorker = () => {
	self.addEventListener('install', () => {
		console.log('service worker installed');
	});
};

installWorker();

// active
const activateWorker = () => {
	self.addEventListener('activate', () => {
		console.log('service worker activated');
	});
};

activateWorker();


const fetchEvent = () => {
    self.addEventListener('fetch', (e:any) => {
      e.respondWith(
        cacheClone(e)
          .catch(() => caches.match(e.request))
          .then((res) => res)
      );
    });
  };
  
  fetchEvent();
