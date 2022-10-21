export {};
const { admin, db } = require('../config/firebase');

const add_new_user = async (user: any) => {
  const add_user = db.collection('users').doc(user.uid);
  const userRef = await add_user.get();
  if (!userRef.exists) {
    await add_user.set({
      email: user.email,
      watchlist: [],
    });
  }
};

const add_asset_to_watchlist = async (
  user: any,
  to_add_watchlist_data: string
) => {
  const add_to_watchlist = db.collection('users').doc(user);
  await add_to_watchlist.update({
    watchlist: admin.firestore.FieldValue.arrayUnion(to_add_watchlist_data),
  });
};

const delete_asset_from_watchlist = async (
  user: any,
  to_delete_watchlist_data: string
) => {
  const delete_from_watchlist = db.collection('users').doc(user);
  await delete_from_watchlist.update({
    watchlist: admin.firestore.FieldValue.arrayRemove(to_delete_watchlist_data),
  });
};

const get_user_watch_list_db = async (user: any) => {
  const check_watchlist = db.collection('users').doc(user);
  const userRef = await check_watchlist.get();
  if (userRef.exists) {
    return userRef.data().watchlist;
  }
};

const watchlist_handler_db = async (
  user: any,
  to_add_watchlist_data: string
) => {
  const check_watchlist = db.collection('users').doc(user.uid);
  const userRef = await check_watchlist.get();
  if (userRef.exists) {
    const watchlist = userRef.data().watchlist;
    if (watchlist.includes(to_add_watchlist_data)) {
      console.log('Asset already in watchlist. Deleting...');
      await delete_asset_from_watchlist(user.uid, to_add_watchlist_data);
    } else {
      console.log('Asset not in watchlist. Adding...');
      await add_asset_to_watchlist(user.uid, to_add_watchlist_data);
    }
  }
};

module.exports = {
  add_new_user,
  get_user_watch_list_db,
  watchlist_handler_db,
};
