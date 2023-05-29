const express = require('express');
const route_Books = express.Router()
const {checkisLogged} = require("../../middleware/checkAuth");
const { checkAdmmin } = require('../../middleware/checkAdmin');

const { get_Books,add_Books,get_Books_by_id,update_Books,get_most_books_users,delete_Books,get_Books_for_Admin,set_status_books,get_my_Books,get_book_by_category, incriment_Like ,get_rendom_books,get_most_Like_books} = require("../controller/books.controller");

route_Books.route('/').get(get_Books).post(checkisLogged,add_Books);
route_Books.route('/book/:id').get(get_Books_by_id).patch(checkisLogged,update_Books).delete(checkisLogged,delete_Books).post(checkisLogged,set_status_books).put(incriment_Like);
route_Books.route('/admin').get(checkisLogged,checkAdmmin,get_Books_for_Admin);
route_Books.route('/mybooks').get(checkisLogged,get_my_Books);
route_Books.route('/category/:id').get(get_book_by_category);
route_Books.route('/rendom').get(get_rendom_books);
route_Books.route('/mostLike').get(get_most_Like_books);
route_Books.route('/MostPublisher').get(get_most_books_users);

module.exports = route_Books;