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


exports.onLikesUpdated = functions.firestore.document('users/{id}').onUpdate(async (change, context)=>{

    const { last_update, uid  } = change.after.data();
    const recipes = admin.firestore().collection('recipes');
    const docRef = await recipes.doc(`${last_update.payload}`).get();

    console.log({docRef, last_update, uid});

    if(last_update.type === 'add_like'){
      if(docRef.exists){
        return await recipes.doc(`${last_update.payload}`).update({
          likedByUsers: admin.firestore().FieldValue.arrayUnion(uid),
          likesCount: admin.firestore().FieldValue.increment(1)
        })
      }
      else{
        console.log("my function reached this checkpoint")
        return await recipes.doc(`${last_update.payload}`).set({
          likedByUsers: [uid],
          likesCount: 1,
          recipe_id: last_update.payload
        })
      }
    }
    if(last_update.type === 'remove_like'){
      if(docRef.exists){
        return await recipes.doc(`${last_update.payload}`).update({
          likedByUsers: admin.firestore().FieldValue.arrayRemove(uid),
          likesCount: admin.firestore().FieldValue.increment(-1)
        })
      }
      else{
        return await recipes.doc(`${last_update.payload}`).set({
          likedByUsers: [],
          likesCount: 0,
          recipe_id: last_update.payload
        })
      }
    }
})
