BEGIN;

TRUNCATE
  capstone1_affirmations,
  capstone1_comments,
  capstone1_journals,
  capstone1_users
  RESTART IDENTITY CASCADE;

INSERT INTO capstone1_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, '$2a$12$9pwXJQOSt47O0J4s40WpOu/DH6MZyZfeh2peVqnQJnvLXwZbzaRXa'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', '$2a$12$qnx1ISgXVaITkbWhHerTSO2Y1sGCN/3438sHspygyY7pSJOmUUYHS'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', '$2a$12$mIxs0rvu/bKrKCEzZ6Kmue3T6Ab6RPHJ7HC99Y/9lW3OhFfxyNIl2'),
  ('s.smith', 'Sam Smith', 'Sam', '$2a$12$5cXZVvOpc.Xsm7RzueVG3erRLDGa7i3TJ9r0R3vJdpH4Wh3dcD82i'),
  ('lexlor', 'Alex Taylor', 'Lex', '$2a$12$yuXT94Yh1uE2jDYrXcCjAOe4NECCzDcU2NGB0eZbSH37O6.uouKVW'),
  ('wippy', 'Ping Won In', 'Ping', '$2a$12$Qc7fndZNAz707Ww9grE/FusFN2d6H7bS5GXxrrPOPEkG0aR6pVD86');

INSERT INTO capstone1_journals (mood, user_id, content)
VALUES
  ('mood 1', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('mood 3', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('mood 5', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('mood 2', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('mood 1', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('mood 5', 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('mood 4', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('mood 3', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('mood 2', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('mood 1', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

INSERT INTO capstone1_affirmations (user_id, content)
VALUES
  (1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  (2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  (3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  (4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  (5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  (6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  (1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  (2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  (3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  (4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');


INSERT INTO capstone1_comments (
  content,
  affirmation_id,
  user_id
) VALUES
  (
    'This post is amazing',
    1,
    2
  ),
  (
    'Yeh I agree it''s amazing',
    1,
    3
  ),
  (
    'I would go so far as to say it''s double amazing',
    1,
    4
  ),
  (
    'A-mazing!',
    1,
    5
  ),
  (
    'That''s some interesting lorems you raise',
    2,
    6
  ),
  (
    'Yeh totally I''d never thought about lorems like that before',
    2,
    1
  ),
  (
    'So you''re saying consectetur adipisicing elit?',
    2,
    3
  ),
  (
    'Sixth? You mean sith?!!',
    4,
    6
  ),
  (
    'What do you call an evil procrastinator? Darth Later! Hahahahaha!',
    4,
    4
  ),
  (
    'Ten ten ten ten ten ten ten!',
    10,
    3
  ),
  (
    'Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam!!!',
    10,
    5
  ),
  (
    '5, 6, 7, 8! My boot-scootin'' baby is drivin'' me crazy...!',
    7,
    1
  ),
  (
    'My obsession from a western! My dance floor date',
    7,
    2
  ),
  (
    'My rodeo Romeo. A cowboy god from head to toe',
    7,
    3
  ),
  (
    'Wanna make you mine. Better get in line. 5, 6, 7, 8!',
    7,
    4
  ),
  (
    'Just a lonely comment',
    9,
    6
  ),
  (
    'Really? Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris??!',
    6,
    5
  ),
  (
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris for sure!!',
    6,
    1
  ),
  (
    'WOAH!!!!!',
    8,
    2
  ),
  (
    '°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸',
    8,
    4
  );

COMMIT;