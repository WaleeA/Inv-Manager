import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
export default pb;

class SimpleStore {
  constructor(initialValue) {
    this.value = initialValue;
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  set(newValue) {
    this.value = newValue;
    this.notify();
  }

  update(updater) {
    this.value = updater(this.value);
    this.notify();
  }

  notify() {
    this.subscribers.forEach((callback) => callback(this.value));
  }
}

export const currentUser = new SimpleStore(pb.authStore.model);

export const unsubscribe = currentUser.subscribe((auth) => {
  console.log("Auth changed: ", auth);
});

pb.authStore.onChange((auth) => {
  console.log("Auth changed: ", auth);
  currentUser.set(pb.authStore.model);
});
