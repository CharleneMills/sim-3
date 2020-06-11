select hp.title, hu.username, hu.profile_pic, hp.img, hp.content from helo_posts hp
join helo_users hu on (hp.author_id = hu.id)
where hp.id = $1;