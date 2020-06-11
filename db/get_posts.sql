select hp.title, hu.username, hu.profile_pic, hp.id from helo_posts hp
join helo_users hu on (hp.author_id = hu.id);
