/* Google sign-in + Firestore sync for the hosted checklist.
   Turns itself on only when firebase-config.js provides a config.
   Each signed-in user's progress lives at progress/{uid}. */
(function () {
  var cfg = window.OOT_FIREBASE_CONFIG;
  if (!cfg || !cfg.apiKey || !window.firebase) return;

  try { firebase.initializeApp(cfg); } catch (e) { console.error("Firebase init failed", e); return; }
  var auth = firebase.auth();
  var db = firebase.firestore();
  auth.getRedirectResult().catch(function (e) { console.warn("Redirect sign-in failed", e); });

  function docRef(uid) { return db.collection("progress").doc(uid); }

  window.ootCloud = {
    onAuth: function (cb) {
      return auth.onAuthStateChanged(function (u) {
        cb(u ? { uid: u.uid, name: u.displayName || u.email || "" } : null);
      });
    },
    signIn: function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      return auth.signInWithPopup(provider).catch(function (e) {
        var code = e && e.code;
        if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment") {
          return auth.signInWithRedirect(provider);
        }
        if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return;
        throw e;
      });
    },
    signOut: function () { return auth.signOut(); },
    watch: function (uid, next, err) {
      return docRef(uid).onSnapshot({ includeMetadataChanges: true }, function (s) {
        var d = s.exists ? s.data() : null;
        next({
          exists: s.exists,
          checked: d && d.checked,
          fromCache: s.metadata.fromCache,
          pending: s.metadata.hasPendingWrites
        });
      }, err);
    },
    save: function (uid, body) {
      return docRef(uid).set({ v: body.v, checked: body.checked, updated: firebase.firestore.FieldValue.serverTimestamp() });
    }
  };
})();
