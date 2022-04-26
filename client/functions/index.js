const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

//auth trigger user signup
exports.newUserSignUp = functions.auth.user().onCreate(user=>{
  return admin.firestore().collection('users').doc(user.uid).set({
    uid: user.uid,
    likedRecipes:[]
  })
});


exports.userDeleted = functions.auth.user().onDelete(user => {
  const doc = admin.firestore().collection('users').doc(user.uid);
  return doc.delete();
});
