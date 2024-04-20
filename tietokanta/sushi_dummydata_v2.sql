INSERT INTO `user` (`role`, `username`, `password`, `first_name`, `last_name`, `address`, `email`, `phone`, `avatar`)
VALUES
('admin', 'admin', 'admin', 'Ad', 'Min', 'Helsinginkatu 25', 'admin@example.com', '12345678', 'avatar3.jpg'),
('customer', 'customer', 'customer', 'Cus', 'Tomer', 'Espoonkuja 3', 'customer@example.com', '87654321', 'avatar4.jpg');

INSERT INTO `restaurant` (`name`, `address`)
VALUES
('Sakura Sushi', '123 Sakura Ave'),
('Zen Sushi Bar', '789 Zen Blvd');

INSERT INTO `menuitem` (`name`, `price`, `description`, `allergen`, `category`, `image`)
VALUES
('Sushi Combo', 18.99, 'A delightful combination of fresh nigiri and maki sushi. Our sushi combo includes a variety of fish and vegetarian options. Perfect for sushi lovers who want to try a little bit of everything.', 'fish, shellfish, soy', 'Japanese', 'sushi_combo.jpeg'),
('Spicy Beef Ramen', 14.99, 'Rich and flavorful beef broth served with tender slices of beef, ramen noodles, soft-boiled egg, and a variety of vegetables. Our spicy beef ramen is perfect for those who crave a hearty and spicy meal.', 'gluten, soy', 'Japanese', 'spicy_beef_ramen.jpeg'),
('Vegetable Spring Rolls', 8.99, 'Crispy and golden spring rolls filled with fresh vegetables and served with a side of sweet chili dipping sauce. A light and delicious appetizer or snack.', 'gluten', 'Chinese', 'vegetable_spring_rolls.jpg'),
('Shrimp Tempura', 11.99, 'Light and crispy shrimp tempura served with a side of tempura dipping sauce. Our shrimp tempura is made with fresh shrimp and a light batter, fried to perfection.', 'gluten, shellfish', 'Japanese', 'shrimp_tempura.jpg'),
('Pineapple Fried Rice', 12.99, 'Fragrant jasmine rice stir-fried with juicy pineapple, tender chicken, crunchy cashews, and colorful vegetables. Our pineapple fried rice is a sweet and savory delight that''s sure to please.', 'soy, peanuts', 'Thai', 'pineapple_fried_rice.jpeg'),
('Beef Pad Thai', 14.99, 'A classic Thai stir-fried noodle dish made with tender slices of beef, rice noodles, bean sprouts, green onions, and peanuts, all tossed in a tangy and savory Pad Thai sauce.', 'gluten, peanuts', 'Thai', 'beef_pad_thai.jpeg'),
('Tom Yum Soup', 13.99, 'A spicy and tangy Thai soup made with lemongrass, galangal, kaffir lime leaves, chili peppers, and shrimp. Bursting with vibrant flavors, our Tom Yum soup is sure to tantalize your taste buds.', 'shellfish', 'Thai', 'tom_yum_soup.jpg'),
('Beef Bulgogi', 16.99, 'Thinly sliced marinated beef stir-fried with vegetables in a sweet and savory bulgogi sauce. Served with steamed rice and kimchi on the side. A classic Korean dish that bursts with flavor.', 'soy', 'Korean', 'beef_bulgogi.jpg'),
('Ox Tripe Stew', 17.99, 'A rich and hearty stew made with tender ox tripe, potatoes, carrots, and spices. Slow-cooked to perfection, our ox tripe stew is a comforting and satisfying meal that''s perfect for sharing.', 'gluten, soy', 'Chinese', 'ox_tripe_stew.jpg'),
('Chicken Teriyaki Bowl', 12.99, 'Grilled chicken glazed in a sweet and savory teriyaki sauce, served over steamed rice and garnished with sesame seeds and green onions. Our chicken teriyaki bowl is a classic Japanese dish that''s sure to satisfy your cravings.', 'soy, sesame', 'Japanese', 'chicken_teriyaki_bowl.jpg'),
('Pork Ramen', 15.99, 'A comforting bowl of pork ramen in a rich and flavorful broth, topped with slices of tender pork belly, marinated soft-boiled egg, bamboo shoots, nori, and green onions. Our pork ramen is a hearty and satisfying meal that''s perfect for any time of day.', 'gluten, soy', 'Japanese', 'pork_ramen.jpg'),
('Spicy Tuna Roll', 10.99, 'Fresh tuna mixed with spicy mayo and wrapped in sushi rice and nori. Topped with sesame seeds and served with soy sauce, pickled ginger, and wasabi. Our spicy tuna roll is a classic sushi favorite that''s perfect for spice lovers.', 'gluten, soy, fish', 'Japanese', 'spicy_tuna_roll.jpg'),
('Beef Pho', 13.99, 'A fragrant and flavorful Vietnamese noodle soup made with thinly sliced beef, rice noodles, bean sprouts, basil, and lime, all served in a rich and aromatic beef broth. Our beef pho is a comforting and nourishing dish that''s perfect for any occasion.', 'gluten, soy', 'Vietnamese', 'beef_pho.jpg'),
('Chicken Katsu', 13.99, 'Juicy chicken cutlets breaded and fried to perfection, served with steamed rice, shredded cabbage, and tonkatsu sauce for dipping. Our chicken katsu is a delicious Japanese comfort food that''s sure to satisfy your cravings.', 'gluten, soy', 'Japanese', 'chicken_katsu.jpeg'),
('Vegetable Spring Rolls', 9.99, 'Crispy and flavorful spring rolls filled with a mix of fresh vegetables, vermicelli noodles, and aromatic herbs. Served with a sweet and tangy dipping sauce. Our vegetable spring rolls are a light and delicious appetizer that''s perfect for sharing.', 'gluten, soy', 'Chinese', 'vegetable_spring_rolls.jpeg'),
('Tofu Teriyaki Bowl', 12.99, 'Grilled tofu glazed in a sweet and savory teriyaki sauce, served over steamed rice and garnished with sesame seeds and green onions. Our tofu teriyaki bowl is a delicious and nutritious vegetarian option that''s sure to satisfy your cravings.', 'soy, sesame', 'Japanese', 'tofu_teriyaki_bowl.jpeg'),
('Vegetable Pad Thai', 13.99, 'A classic Thai noodle dish made with stir-fried rice noodles, tofu, bean sprouts, green onions, and egg, tossed in a sweet and tangy tamarind sauce. Garnished with crushed peanuts, cilantro, and lime wedges. Our vegetable pad Thai is a flavorful and satisfying vegetarian option.', 'gluten, soy, peanuts', 'Thai', 'vegetable_pad_thai.jpeg'),
('Pho Ga', 12.99, 'A comforting Vietnamese noodle soup made with flavorful chicken broth, rice noodles, tender chicken slices, and fresh herbs. Served with bean sprouts, lime wedges, and chili on the side.', 'gluten, soy', 'Vietnamese', 'pho_ga.jpg'),
('Bun Cha', 13.99, 'A classic Vietnamese dish featuring grilled pork meatballs served over vermicelli noodles, fresh herbs, pickled vegetables, and a savory dipping sauce. Light, flavorful, and perfect for any time of day.', 'soy', 'Vietnamese', 'bun_cha.jpg'),
('Banh Xeo', 10.99, 'A delicious Vietnamese savory pancake made with rice flour, turmeric, coconut milk, and filled with shrimp, pork, bean sprouts, and herbs. Served with fresh lettuce leaves and a sweet and sour dipping sauce.', 'gluten, soy, shellfish', 'Vietnamese', 'banh_xeo.jpeg'),
('Bulgogi Bibimbap', 15.99, 'A classic Korean rice dish topped with thinly sliced marinated beef (bulgogi), sautéed vegetables, a fried egg, and spicy gochujang sauce. Mixed together before eating for a flavorful and satisfying meal.', 'soy', 'Korean', 'bulgogi_bibimbap.jpg'),
('Kimchi Jjigae', 14.99, 'A hearty Korean stew made with kimchi, tofu, pork, and vegetables, simmered in a spicy and flavorful broth. Served bubbling hot with a side of steamed rice.', 'soy', 'Korean', 'kimchi_jjigae.jpg'),
('Japchae', 13.99, 'A popular Korean stir-fried noodle dish made with sweet potato starch noodles (dangmyeon), beef, assorted vegetables, and seasoned with soy sauce and sesame oil. A delicious and colorful dish that''s perfect for any occasion.', 'soy', 'Korean', 'japchae.jpeg');

INSERT INTO `order` (`user_id`, `restaurant_id`, `total_cost`, `date`, `status`)
VALUES
(1, 1, 12.98, '2024-04-09', 'Pending'),
(1, 2, 9.98, '2024-02-11', 'Delivered'),
(2, 2, 27.97, '2024-04-09', 'Pending'),
(2, 1, 6.97, '2024-03-28', 'Delivered'),
(2, 2, 18.97, '2024-01-17', 'Delivered');

INSERT INTO `orderitem` (`menuitem_id`, `order_id`, `quantity`)
VALUES
(1, 1, 1),
(2, 2, 2);

INSERT INTO `dailymenu` (`date`, `restaurant_id`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`)
VALUES
('2024-04-09', 1, 'Vegetable Pad Thai', 'Beef Pho', NULL, NULL, NULL, NULL),
('2024-04-10', 1, 'Tofu Teriyaki Bowl', 'Ox Tripe Stew', NULL, NULL, NULL, NULL),
('2024-04-11', 1, 'Tofu Teriyaki Bowl', 'Ox Tripe Stew', NULL, NULL, NULL, NULL),
('2024-04-12', 1, 'Tofu Teriyaki Bowl', 'Chicken Katsu', NULL, NULL, NULL, NULL),
('2024-04-13', 1, 'Tofu Teriyaki Bowl', 'Ox Tripe Stew', NULL, NULL, NULL, NULL),
('2024-04-14', 1, 'Chicken Katsu', 'Ox Tripe Stew', NULL, NULL, NULL, NULL),
('2024-04-15', 1, 'Tofu Teriyaki Bowl', 'Vegetable Pad Thai', NULL, NULL, NULL, NULL),
('2024-04-09', 2, 'Vegetable Pad Thai', 'Beef Pho', NULL, NULL, NULL, NULL),
('2024-04-10', 2, 'Tofu Teriyaki Bowl', NULL, NULL, NULL, NULL, NULL),
('2024-04-11', 2, 'Tofu Teriyaki Bowl', 'Ox Tripe Stew', NULL, NULL, NULL, NULL),
('2024-04-12', 2, 'Tofu Teriyaki Bowl', 'Chicken Katsu', NULL, NULL, NULL, NULL),
('2024-04-13', 2, 'Tofu Teriyaki Bowl', 'Ox Tripe Stew', NULL, NULL, NULL, NULL),
('2024-04-14', 2, 'Chicken Katsu', NULL, NULL, NULL, NULL, NULL),
('2024-04-15', 2, 'Tofu Teriyaki Bowl', 'Vegetable Pad Thai', NULL, NULL, NULL, NULL);

