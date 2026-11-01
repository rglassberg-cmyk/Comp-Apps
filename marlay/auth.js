// Parent login (Firebase Auth: Google sign-in or an emailed sign-in link).
//
// Signing in only proves who someone is. Whether they get in is decided by the sheet
// script: it checks the Firebase ID token and looks the email up in the Dances sheet's
// "Parents" tab, then returns the dances, roster, and that family's dancers. This file
// never decides access itself.
//
// Exposes window.marlayAuth for the main script, and fires "marlay-auth" on window
// whenever the signed-in user changes (detail: the user, or null).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithCredential, signOut,
  sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink,
  setPersistence, browserLocalPersistence
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

const EMAIL_KEY = 'marlay-signin-email';
const app = initializeApp(STUDIO.auth.firebase);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch(() => {});

function storedEmail() { try { return localStorage.getItem(EMAIL_KEY); } catch (e) { return null; } }
function storeEmail(v) { try { v ? localStorage.setItem(EMAIL_KEY, v) : localStorage.removeItem(EMAIL_KEY); } catch (e) {} }

// The page the emailed link comes back to: this page, without any old sign-in params.
function returnUrl() {
  const url = new URL(location.href);
  ['apiKey', 'oobCode', 'mode', 'lang', 'continueUrl'].forEach(k => url.searchParams.delete(k));
  url.hash = '';
  return url.href;
}

window.marlayAuth = {
  get user() { return auth.currentUser; },
  // Opening the page from an emailed link: true until finishEmailLink() runs.
  pendingEmailLink: isSignInWithEmailLink(auth, location.href),
  storedEmail,
  token: () => auth.currentUser ? auth.currentUser.getIdToken() : Promise.resolve(null),
  // Fallback only: Firebase's popup goes through marlay-calendar.firebaseapp.com in a
  // second tab, which loses its state on iPhones ("missing initial state"). The main
  // button is Google's own (see index.html), which hands back an ID token on this page.
  signInWithGoogle: () => signInWithPopup(auth, new GoogleAuthProvider()),
  signInWithGoogleToken: idToken => signInWithCredential(auth, GoogleAuthProvider.credential(idToken)),
  sendEmailLink: async email => {
    await sendSignInLinkToEmail(auth, email, { url: returnUrl(), handleCodeInApp: true });
    storeEmail(email);
  },
  finishEmailLink: async email => {
    await signInWithEmailLink(auth, email, location.href);
    storeEmail(null);
    window.marlayAuth.pendingEmailLink = false;
    history.replaceState(null, '', returnUrl());
  },
  signOut: () => signOut(auth)
};

onAuthStateChanged(auth, user => {
  window.dispatchEvent(new CustomEvent('marlay-auth', { detail: user }));
});
window.dispatchEvent(new Event('marlay-auth-ready'));
