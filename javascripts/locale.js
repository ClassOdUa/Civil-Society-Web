var LOCALE_ARRAY = [{selector: '#main-page .ui-title', en: 'Log in', ru: 'Вход', ua: 'Вхід'},/*inner html*/
{selector: '#main-page .ui-input-text [name=login]', value: 'placeholder', en: 'Login', ru: 'Логин', ua: 'Логін'},/*placeholder*/
{selector: '#main-page .ui-input-text [name=pass]', value: 'placeholder', en: 'Password', ru: 'Пароль', ua: 'Пароль'},/*placeholder*/
{selector: '#main-page .ui-btn.ui-corner-all.ui-btn-inherit.ui-btn-icon-left', en: 'Remember me', ru: 'Запомнить меня', ua: 'Запам\'ятати мене'},/*inner html*/
{selector: '#main-page .btn-login .ui-btn.ui-shadow.ui-corner-all',	 en: 'Log In', ru: 'Войти', ua: 'Ввійти'},/*inner html*/
{selector: '#main-page .ui-btn.ui-btn-inline.ui-corner-all.ui-btn-reg', en: 'Registration', ru: 'Регистрация', ua: 'Реєстрація'},/*inner html*/
{selector: '#main-page .ui-btn.ui-btn-inline.ui-corner-all.ui-btn-pass', en: 'Forgot password', ru: 'Забыли пароль', ua: 'Забули пароль'},/*inner html*/
{selector: '#main-page .btn-login-soc .ui-btn.ui-shadow.ui-corner-all', 
	en: 'LOG IN BY SOCIAL NETWORKS', 
	ru: 'ВХОД С ПОМОЩЬЮ СОЦИАЛЬНЫХ СЕТЕЙ', 
	ua: 'ВХІД ЗА ДОПОМОГОЮ СОЦІАЛЬНИХ МЕРЕЖ'},/*inner html*/
{selector: '#main-page .social-wrap .title', 
	en: 'Sign in by social Networks', 
	ru: 'Войти с помощью социальных сетей', 
	ua: 'Ввійти за допомогою соціальних мереж'},/*inner html*/
{selector: '#registration .ui-title', en: 'Registration', ru: 'Регистрация', ua: 'Реєстрація'},/*inner html*/
{selector: '#registration .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#registration #register-form .text-field label:eq(0)', 
	en: 'Username (only letters and numbers, 2 to 64 characters)', 
	ru: 'Имя пользователя(только буквы и числа, 2-64 символа)', 
	ua: 'Ім\'я користувача(тільки літери та числа, 2-64 символа)'},/*inner html*/
{selector: '#registration #register-form [name=username]', value: 'placeholder', en: 'User', ru: 'Пользователь', ua: 'Користувач'},/*placeholder*/
{selector: '#registration #register-form .text-field label:eq(1)', 
	en: 'User`s email (please provide a real email address, you`ll get a verification mail with an activation link)', 
	ru: 'Электронный адрес(пожалуйста, предоставьте реальный email, вы сможете подтвердить адрес с помощью ссылки активации)', 
	ua: 'Электронна адреса(будь ласка, введіть реальный email, ви зможете підтвердити адресу за допомогою посилання активації)'},/*inner html*/
{selector: '#registration #register-form [name=email]', value: 'placeholder', en: 'Email', ru: 'Email', ua: 'Email'},/*placeholder*/
{selector: '#registration #register-form .text-field label:eq(2)', 
	en: 'Password (min. 6 characters!)', 
	ru: 'Пароль(минимум 6 символов)', 
	ua: 'Пароль(мінімум 6 символів)'},/*inner html*/
{selector: '#registration #register-form [name=password]', value: 'placeholder', en: 'qwerty', ru: 'йцукен', ua: 'йцукен'},/*placeholder*/
{selector: '#registration #register-form .text-field label:eq(3)', 
	en: 'Password repeat', 
	ru: 'Повторите пароль', 
	ua: 'Повторіть пароль'},/*inner html*/
{selector: '#registration #register-form [name=password_r]', value: 'placeholder', en: 'qwerty', ru: 'йцукен', ua: 'йцукен'},/*placeholder*/
{selector: '#registration #register-form .text-field label:eq(4)', 
	en: 'Please enter these characters', 
	ru: 'Пожалуйста, введите эти символы', 
	ua: 'Будь ласка, введіть ці символи'},/*inner html*/
{selector: '#registration .ui-btn.ui-btn-corner-all.ui-shadow', value: 'value', en: 'Register', ru: 'Зарегистрироваться', ua: 'Зареєструватись'},/*value*/
{selector: '#forgot-password .text-field > label', 
	en: 'Enter your login to restore access',
 	ru: 'Введите ваш логин, чтобы восстановить доступ', 
 	ua: 'Введіть ваш логін, щоб відновити доступ'},/*inner html*/
{selector: '#forgot-password .ui-title', en: 'Forgot password', ru: 'Забыли пароль', ua: 'Забули пароль'},/*inner html*/
{selector: '#forgot-password .ui-input-text > input', value: 'placeholder', en: 'Username', ru: 'Имя пользователя', ua: 'Ім\'я користувача'},/*placeholder*/
{selector: '#forgot-password .ui-btn.ui-btn-corner-all.ui-shadow', value: 'value', en: 'Restore access', ru: 'Восстановить доступ', ua: 'Відновити доступ'},/*value*/
{selector: '#help .ui-title', en: 'Help', ru: 'Помощь', ua: 'Допомога'},/*inner html*/
{selector: '#decision-making .ui-title', en: 'Decision-making', ru: 'Принятие решений', ua: 'Прийняття рішень'},/*inner html*/
{selector: '#decision-making #decision-making-help .title', en: 'Description', ru: 'Детальнее', ua: 'Детальніше'},/*inner html*/
{selector: '#decision-making #decision-making-help .text', 
	en: 'Help', 
	ru: 'Помощь', 
	ua: 'Допомога'},/*inner html*/
{selector: '#decision-making [data-link=#trust-list]', en: 'Trust List', ru: 'Список Доверия', ua: 'Список довіри'},/*inner html*/
{selector: '#decision-making [data-link=#public-proposals]', en: 'Public proposals', ru: 'Общественные предложения', ua: 'Громадські пропозиції'},/*inner html*/
{selector: '#decision-making [data-link=#local-self-governments]', 
	en: 'Issues of local self-governments', 
	ru: 'Вопросы местного самоуправления', 
	ua: 'Питання місцевого самоврядування'},/*inner html*/
{selector: '#decision-making [data-link=#co-owners]', 
	en: 'Solutions with other co-owners and co-investors', 
	ru: 'Решения с другими совладельцами и соинвесторами', 
	ua: 'Рішення з іншими співвласниками і співінвесторами'},/*inner html*/
{selector: '#decision-making [data-link=#parties]', 
	en: 'Political parties, NGOs volunteering groups', 
	ru: 'Политические партии, общественные организации добровольческих групп', 
	ua: 'Політичні партії, громадські організації добровольчих груп'},/*inner html*/
{selector: '#decision-making [data-link=#primaries]', en: 'Primaries, elections, exit-polls', ru: 'Первичные, выборы, экзит-', ua: 'Первинні, вибори, екзит'},/*inner html*/
{selector: '#social-investment .ui-title', en: 'Social Investment', ru: 'Социальные инвестиции', ua: 'Соціальні інвестиції'},/*inner html*/
{selector: '#social-investment #social-investment-help .title', en: 'Description', ru: 'Детальнее', ua: 'Детальніше'},/*inner html*/
{selector: '#social-investment #social-investment-help .text', 
	en: 'Help', 
	ru: 'Помощь', 
	ua: 'Допомога'},/*inner html*/
{selector: '#social-investment [data-link=#my-fund-page]', en: 'My Personal Funds', ru: 'Мои персональные фонды', ua: 'Мої персональні фонди'},/*inner html*/
{selector: '#social-investment [data-link=#programs-page]', en: 'Program of social co-investment', ru: 'Программа социального соинвестирования', ua: 'Програма соціального співінвестування'},/*inner html*/
{selector: '#social-entrepreneurship .ui-title', en: 'Social Entrepreneurship', ru: 'Социальное предпринимательство', ua: 'Соціальне підприємництво'},/*inner html*/
{selector: '#social-entrepreneurship #social-entrepreneurship-help .title', en: 'Description', ru: 'Детальнее', ua: 'Детальніше'},/*inner html*/
{selector: '#social-entrepreneurship #social-entrepreneurship-help .text', 
	en: 'Help', 
	ru: 'Помощь', 
	ua: 'Допомога'},/*inner html*/
{selector: '#social-entrepreneurship [data-link=#projects-page]', en: 'Projects', ru: 'Проекты', ua: 'Проекти'},/*inner html*/
{selector: '#social-entrepreneurship [data-link=#project_propositions-page]', en: 'Projects on Call', ru: 'Проекты по вызову', ua: 'Проекти за викликом'},/*inner html*/
{selector: '#social-entrepreneurship [data-link=#requests-page]', en: 'Requests for help', ru: 'Просьбы о помощи', ua: 'Прохання про допомогу'},/*inner html*/
{selector: '#my-activities-page .ui-title', en: 'My activities', ru: 'Моя деятельность', ua: 'Моя діяльність'},/*inner html*/
{selector: '#my-activities-page #my-activities-help .title', en: 'Description', ru: 'Детальнее', ua: 'Детальніше'},/*inner html*/
{selector: '#my-activities-page #my-activities-help .text', 
	en: 'Help', 
	ru: 'Помощь', 
	ua: 'Допомога'},/*inner html*/
{selector: '#my-activities-page [data-link=#profile-page]', en: 'My Profile', ru: 'Мой профиль', ua: 'Мій профіль'},/*inner html*/
{selector: '#my-activities-page [data-link=#my-votings-page]', en: 'My votings', ru: 'Мои голосования', ua: 'Мої голосування'},/*inner html*/
{selector: '#my-activities-page [data-link=#my-programs-page]', en: 'My programs', ru: 'Мои программы', ua: 'Мої програми'},/*inner html*/
{selector: '#my-activities-page [data-link=#my_project_propositions-page]', en: 'My projects on Call', ru: 'Мои проекты по вызову', ua: 'Мої проекти за викликом'},/*inner html*/
{selector: '#my-activities-page [data-link=#weighted-votings-page]', en: 'My weighted votings on programs', ru: 'Мои взвешенные голосования по программам', ua: 'Мої зважені голосування за програмами'},/*inner html*/
{selector: '#my-activities-page [data-link=#my_project-page]', en: 'My projects', ru: 'Мои проекты', ua: 'Мої проекти'},/*inner html*/
{selector: '#my-activities-page [data-link=#my_request-page]', en: 'My requests', ru: 'Мои запросы', ua: 'Мої запити'},/*inner html*/

{selector: '#future .ui-title', en: 'Future', ru: 'В будущем', ua: 'В майбутньому'},/*inner html*/
{selector: '#future #future-help .title', en: 'Description', ru: 'Детальнее', ua: 'Детальніше'},/*inner html*/
{selector: '#future #future-help .text', 
	en: 'Help', 
	ru: 'Помощь', 
	ua: 'Допомога'},/*inner html*/
{selector: '#future [role=main] p', en: 'This option will be activated in future releases', 
	ru: 'Эта опция будет активирована в будущих релизах', 
	ua: 'Ця опція буде активована в майбутніх релізах'},/*inner html*/

{selector: '#news-page .ui-title', en: 'News', ru: 'Новости', ua: 'Новини'},/*inner html*/
{selector: '#news-page .author > span', en: 'news by', ru: 'опубликовано', ua: 'опубліковано'},/*inner html*/
{selector: '#news-page #news-help .title', en: 'Description', ru: 'Детальнее', ua: 'Детальніше'},/*inner html*/
{selector: '#news-page #news-help .text', 
	en: 'The news block gives you an up-to-date information about programms you interested in.', 
	ru: 'Новостная лента дает информацию о последних изменениях в интересующих вас вещах.', 
	ua: 'Стрічка новин длозволяє переглянути останню інформацію про важливі для вас речі.'},/*inner html*/
{selector: '#votings-page .ui-title', en: 'Decision-making', ru: 'Принятие решений', ua: 'Прийняття рішень'},/*inner html*/
{selector: '#votings-page .count > span', en: 'Suported', ru: 'Голосов поддержки', ua: 'Голосів підтримки'},/*inner html*/
{selector: '#votings-page .total-count > span', en: 'Total votes', ru: 'Общее количество голосов', ua: 'Загальна кількість голосів'},/*inner html*/
{selector: '#votings-page #voting-help .title', en: 'Description', ru: 'Детальнее', ua: 'Детальніше'},/*inner html*/
{selector: '#votings-page #voting-help .text', 
	en: 'This block gives you a summary information about votings (current or past). You can filter votings by spheres, by date opened or expiring date and sort by stars rate, votes "for", time opened.', 
	ru: 'Блок принятия решений позволяет увидеть список открытых и закрытых голосований голосований с возможностью фильтрации по сферах и дате (как открытия так и окончания), а также с возможностью сортировки по новизне, рейтингу, голосам поддержки.', 
	ua: 'Блок прийняття рішень дозволяє переглянути стиснуту інформацію про список поточних та закінчених голосувань з можливістю фільтрації по сферах та даті (як відкриття так і закінчення), а також з можливістю сортування по новизні, рейтингу, голосам підтримки.'},/*inner html*/
{selector: '#trust-help .title', en: 'Description', ru: 'Детальнее', ua: 'Детальніше'},/*inner html*/
{selector: '#trust-help .text', 
	en: 'Trust list helpes you to choose person for voting in every or certain sphere. You can filter candidates by spere or search certain person by id.', 
	ru: 'Список доверенных лиц создан для выбора человека для голосования от вашего имени в любой или только в определенной сфере. Вы можете отфильтровать кандидатов по сфере их специализации или найти определенного человека по его ID.', 
	ua: 'Список довірених осіб для вибору людини для голосування від вашого імені у всіх або лише у конкретних сферах. Ви можете відфільтрувати кандидатів по сфері їх спеціалізації або знайти конкретну людину за її ID.'},/*inner html*/
{selector: '#trust-list .ui-title', en: 'Trust list', ru: 'Список доверенных лиц', ua: 'Список довірених осіб'},/*inner html*/
{selector: '#trust-list .ui-btn.ui-btn-inherit.ui-btn-icon-left', en: 'Trust list', ru: 'Список доверенных лиц', ua: 'Список довірених осіб'},/*inner html*/
{selector: '#trust-list #select-31-button > span', en: 'Choose vote type', ru: 'Выберите тип голосования', ua: 'Оберіть тип голосування'},/*inner html*/
{selector: '#trust-list .ui-block-a .ui-btn.ui-corner-all', en: 'Trust vote', ru: 'Доверить голос', ua: 'Довірити голос'},/*inner html*/
{selector: '#options-page .ui-title', en: 'Options', ru: 'Настройки', ua: 'Налаштування'},/*inner html*/
{selector: '#options-page .ui-btn.ui-btn-inherit.ui-btn-icon-right.ui-first-child.ui-last-child', 
	en: 'Specify the address for gps', ru: 'Определить адрес по gps', ua: 'Визначити адресу за допомою gps'},/*inner html*/
{selector: '#options-page .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#profile-page .ui-title', en: 'Edit Profile', ru: 'Настройка Профиля', ua: 'Налаштування Профілю'},/*inner html*/
{selector: '#profile-page .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#profile-page .login > span:eq(0)', en: 'Login', ru: 'Залогинен', ua: 'Залогінений'},/*inner html*/
{selector: '#profile-page .add-address .title', 
	en: 'Add up to three address to recieve acces to voting of your regions', 
	ru: 'Добавьте до 3 адресов для получения доступа к голосованию по вашем регионам', 
	ua: 'Додайте до 3 адрес для отримання доступу до голосування по вашим регіонам'},/*inner html*/
{selector: '#profile-page .ui-btn.ui-btn-icon-right[href=#edit-address]', en: 'Address', ru: 'Адрес', ua: 'Адреса'},/*inner html*/
{selector: '#profile-page .social-wrap .title', 
	en: 'Sign in by social Networks to increace your authorisation status', 
	ru: 'Войдите через Социальные сети для повышения вашего статуса авторизации', 
	ua: 'Увійдіть за допомогою Соціальних мереж для підвищення вашого статусу авторизації'},/*inner html*/
{selector: '#profile-page #change-password > label', en: 'Change password here', ru: 'Сменить пароль здесь', ua: 'Змінити пароль тут'},/*inner html*/
{selector: '#profile-page [name=first_name]', value: 'placeholder', en: 'First name', ru: 'Имя', ua: 'Ім\'я'},/*placeholder*/
{selector: '#profile-page [name=last_name]', value: 'placeholder', en: 'Last name', ru: 'Фамилия', ua: 'Прізвище'},/*placeholder*/
{selector: '#profile-page [name=password]', value: 'placeholder', en: 'Enter new password', ru: 'Введите новый пароль', ua: 'Введіть новий пароль'},/*placeholder*/
{selector: '#profile-page [name=repeat_password]', value: 'placeholder', en: 'Accept password', ru: 'Повторите новый пароль', ua: 'Повторіть новий пароль'},/*placeholder*/
{selector: '#profile-page .ui-controlgroup-label > legend', en: 'Enter your date of birth', ru: 'Введите вашу дату рождения', ua: 'Введіть вашу дату народження'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) > span', en: 'January', ru: 'Январь', ua: 'Січень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(0)', en: 'January', ru: 'Январь', ua: 'Січень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(1)', en: 'February', ru: 'Февраль', ua: 'Лютий'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(2)', en: 'March', ru: 'Март', ua: 'Березень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(3)', en: 'April', ru: 'Апрель', ua: 'Квітень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(4)', en: 'May', ru: 'Май', ua: 'Травень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(5)', en: 'June', ru: 'Июнь', ua: 'Червень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(6)', en: 'July', ru: 'Июль', ua: 'Липень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(7)', en: 'August', ru: 'Август', ua: 'Серпень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(8)', en: 'Ceptember', ru: 'Сентябрь', ua: 'Вересень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(9)', en: 'October', ru: 'Октябрь', ua: 'Жовтень'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(10)', en: 'November', ru: 'Ноябрь', ua: 'Листопад'},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(11)', en: 'December', ru: 'Декабрь', ua: 'Грудень'},/*inner html*/
{selector: '#profile-page .text-field:eq(1) > label', en: 'Add url of your avatar', ru: 'Вставьте ссылку на аватар профиля', ua: 'Додайте посилання на аватар профілю'},/*inner html*/
{selector: '#edit-address .ui-title', en: 'Edit Address', ru: 'Редактировать адрес', ua: 'Редагувати адресу'},/*inner html*/
{selector: '#edit-address .btn-next-page .title', 
	en: 'Add up to three address to recieve acces to voting of your regions', 
	ru: 'Добавьте до 3 адресов для получения доступа к голосованию по вашем регионам', 
	ua: 'Додайте до 3 адрес для отримання доступу до голосування по вашим регіонам'},/*inner html*/
{selector: '#profile-page .ui-link > span', en: 'Deactivate', ru: 'Деактивировать', ua: 'Деактивувати'},/*inner html*/
{selector: '#profile-page .active.ui-link > span', en: 'Activate', ru: 'Активировать', ua: 'Активувати'},/*inner html*/
{selector: '#address-item .ui-title', en: 'Edit Address 1', ru: 'Редактировать адрес 1', ua: 'Редагувати адресу 1'},/*inner html*/
{selector: '#address-item .ui-btn.ui-corner-all.ui-shadow', en: 'Find an address using GPS', ru: 'Определить адрес по GPS', ua: 'Визначити адресу по GPS'},/*inner html*/
{selector: '#address-item .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(0) > label', en: 'Country', ru: 'Страна', ua: 'Країна'},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(1) > label', en: 'State', ru: 'Область', ua: 'Область'},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(2) > label', en: 'County', ru: 'Округ', ua: 'Округ'},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(3) > label', en: 'City', ru: 'Город', ua: 'Місто'},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(4) > label', en: 'Index', ru: 'Индекс', ua: 'Індекс'},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(5) > label', en: 'Street', ru: 'Улица', ua: 'Вулиця'},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(6) > label', en: 'Number of House', ru: 'Номер дома', ua: 'Номер будинку'},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(7) > label', en: 'Add some comments', ru: 'Ваши комментарии', ua: 'Ваші коментарі'},/*inner html*/
{selector: '#address-item .ui-btn.ui-btn-inherit.ui-btn-icon-left', en: 'Address official registration', ru: 'Адрес прописки', ua: 'Адреса за пропискою'},/*inner html*/
{selector: '#address-item .btn-save.ui-btn.ui-shadow.ui-corner-all', en: 'Save address', ru: 'Сохранить адрес', ua: 'Зберегти адресу'},/*inner html*/
{selector: '#address-item .btn-delete.ui-btn.ui-shadow.ui-corner-all', en: 'Delete address', ru: 'Удалить адрес', ua: 'Видалити адресу'},/*inner html*/
{selector: '#left-panel .menu-icon-profile', en: 'Profile', ru: 'Профиль', ua: 'Профіль'},/*inner html*/
{selector: '#left-panel .menu-icon-news', en: 'News', ru: 'Новости', ua: 'Новини'},/*inner html*/
{selector: '#left-panel .menu-icon-votings', en: 'Decision-making', ru: 'Принятие решений', ua: 'Прийняття рішень'},/*inner html*/
{selector: '#left-panel .menu-icon-vote', en: 'My votes', ru: 'Мои голоса', ua: 'Мої голоси'},/*inner html DELETE*/
{selector: '#left-panel .menu-icon-trust', en: 'Trust list', ru: 'Доверенные лица', ua: 'Довірені особи'},/*inner html*/
{selector: '#left-panel .menu-icon-vote', en: 'My votes', ru: 'Мои голоса', ua: 'Мої голоси'},/*inner html*/
{selector: '#left-panel .menu-icon-funds', en: 'Funds', ru: 'Фонды', ua: 'Фонди'},/*inner html*/
{selector: '#left-panel .menu-icon-programs', en: 'Social Investment', ru: 'Социальное инвестирование', ua: 'Соціальне інвестування'},/*inner html*/
{selector: '#left-panel .menu-icon-projects', en: 'Social Entrepreneurship', ru: 'Социальное предпринимательство', ua: 'Соціальне підприємництво'},/*inner html*/
{selector: '#left-panel .menu-icon-logout', en: 'Logout', ru: 'Выйти', ua: 'Вийти'},/*inner html*/
{selector: '#left-panel .menu-icon-help', en: 'Help', ru: 'Помощь', ua: 'Допомога'},/*inner html*/
{selector: '#left-panel .menu-icon-activities', en: 'My Activites', ru: 'Мои активности', ua: 'Мої активності'},/*inner html*/
{selector: '#left-panel .menu-icon-tasks', en: 'My tasks', ru: 'Мои задачи', ua: 'Мої задачі'},/*inner html*/
{selector: '#left-panel .menu-icon-options', en: 'Options', ru: 'Настройки', ua: 'Настройки'},/*inner html*/
{selector: '#left-panel .menu-icon-login', en: 'Login', ru: 'Войти', ua: 'Ввійти'},/*inner html*/
{selector: '#profile-page [aria-owns=change-password]', en: 'Change password here', ru: 'Сменить пароль здесь', ua: 'Змінити пароль тут'},/*inner html*/
{selector: '#profile-page .btn-next-page .title', en: 'Select sphere which are interest you', ru: 'Выберите сферу которая вас интересует', ua: 'Оберіть сферу яка вас цікавить'},/*inner html*/
{selector: '#profile-page [href=#spheres-address]', en: 'Choose sphere', ru: 'Выберите сферу', ua: 'Оберіть сферу'},/*inner html*/
{selector: '#profile-page .text-field > label:eq(0)', en: 'Your name and last name', ru: 'Ваше имя и фамилия', ua: 'Ваше ім\'я та прізвище'},/*inner html*/
{selector: '#profile-page #male', en: 'Male', ru: 'Мужчина', ua: 'Чоловік'},/*inner html*/
{selector: '#profile-page #female', en: 'Female', ru: 'Женщина', ua: 'Жінка'},/*inner html*/
{selector: '#profile-page #change_pass_button', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#my-votings-page .ui-title', en: 'My Votes', ru: 'Мои Голоса', ua: 'Мої Голоси'},/*inner html*/
{selector: '#trust-list #choose_sphere_trust-button span', en: 'Choose vote type', ru: 'Выберите тип голосования', ua: 'Оберіть тип голосування'},/*inner html*/
{selector: '#my-votings-page [href=#create-vote]', en: 'Create vote', ru: 'Создать голосование', ua: 'Створити голосування'},/*inner html*/
{selector: '#create-vote .ui-title', en: 'Create vote', ru: 'Создать голосование', ua: 'Створити голосування'},/*inner html*/
{selector: '#create-vote .text-field:eq(0) > label', en: 'Name your voting*', ru: 'Введите название голосования', ua: 'Введіть найменування голосування'},/*inner html*/
{selector: '#create-vote .text-field:eq(1) > label', en: 'Description*', ru: 'Описание', ua: 'Опис'},/*inner html*/
{selector: '#create-vote .text-field:eq(2) > label', 
	en: 'Need supporters to start voting', 
	ru: 'Минимальное количество голосов поддержки для начала голосования', 
	ua: 'Мінімальна кількість голосів для початку голосування'},/*inner html*/
{selector: '#create-vote .jqte_placeholder_text', en: 'Write your description here', ru: 'Опишите голосование здесь', ua: 'Опишіть голосування тут'},/*inner html*/
{selector: '#spheres-address .ui-btn.ui-input-btn.ui-corner-all.ui-shadow', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#spheres-address .ui-title:eq(0)', en: 'Spheres', ru: 'Сферы', ua: 'Сфери'},/*inner html*/
{selector: '#create-vote .ui-input-file > span', 
	en: 'Upload avatar of your vote*', 
	ru: 'Добавьте аватар к вашему голосованию', 
	ua: 'Додайте аватар до вашого голосування'},/*inner html*/
{selector: '#create-vote .date-group.ui-controlgroup.ui-controlgroup-horizontal.ui-corner-all:eq(0) legend', 
	en: 'Enter first date of vote', 
	ru: 'Выберите дату начала голосования', 
	ua: 'Оберіть дату початку голосування'},/*inner html*/
{selector: '#create-vote .date-group.ui-controlgroup.ui-controlgroup-horizontal.ui-corner-all:eq(1) legend', 
	en: 'Enter last date of vote', 
	ru: 'Выбериту дату окончания голосования', 
	ua: 'Оберіть дату закінчення голосування'},/*inner html*/
{selector: '#create-vote .checkbox-group.ui-controlgroup.ui-controlgroup-vertical.ui-corner-all legend', 
	en: 'Required level of voters authorisation to count', 
	ru: 'Необходимый уровень авторизации глосующих для учета в голосовании', 
	ua: 'Необхідний рівень авторизації голосуючих для зарахування в голосуванні'},/*inner html*/
{selector: '#create-vote #v0', en: 'Email', ru: 'Email', ua: 'Email'},/*inner html*/
{selector: '#create-vote #v1', en: 'Social Network', ru: 'Социальная сеть', ua: 'Соціальна мережа'},/*inner html*/
{selector: '#create-vote #v2', en: 'By payment', ru: 'Платежом', ua: 'Оплатою'},/*inner html*/
{selector: '#create-vote #v3', en: 'By passport', ru: 'Паспортом', ua: 'Паспортом'},/*inner html*/
{selector: '#create-vote #v4', en: 'Community members', ru: 'Члены гражданских объединений', ua: 'Члени громадських об\'єднань'},/*inner html*/
{selector: '#create-vote #v5', en: 'Сo-owners', ru: 'Совладельцы', ua: 'Співвласники'},/*inner html*/
{selector: '#create-vote .text-field:eq(2) label', 
	en: 'Need supporters to start voting', 
	ru: 'Минимальное количество голосов поддержки для начала голосования', 
	ua: 'Мінімальна кількість голосів для початку голосування'},/*inner html*/
{selector: '#create-vote .select-group.ui-controlgroup.ui-controlgroup-horizontal.ui-corner-all legend',
	en: 'Voters age limits', ru: 'Возрастные рамки глосующих', ua: 'Вікові межі голосуючих'},/*inner html*/
{selector: '#create-vote .ui-btn.ui-input-btn.ui-corner-all.ui-shadow:eq(0)', en: 'Create Vote', ru: 'Создать голосование', ua: 'Створити голосування'},/*inner html*/
{selector: '#edit-address .ui-title', en: 'Edit Address', ru: 'Редактировать адрес', ua: 'Редагувати адресу'},/*inner html*/
{selector: '#address-item-1 .ui-title', en: 'Edit Address1', ru: 'Редактировать адрес1', ua: 'Редагувати адресу1'},/*inner html*/
{selector: '#address-item-1 .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#address-item-1 #findgps-1', en: 'Find an address using GPS', ru: 'Определить адрес по GPS', ua: 'Визначити адресу за допомогою GPS'},/*inner html*/
{selector: '#address-item-1 form label:eq(0)', en: 'Country', ru: 'Страна', ua: 'Держава'},/*inner html*/
{selector: '#address-item-1 form label:eq(1)', en: 'State', ru: 'Область', ua: 'Область'},/*inner html*/
{selector: '#address-item-1 form label:eq(2)', en: 'County', ru: 'Округ', ua: 'Округ'},/*inner html*/
{selector: '#address-item-1 form label:eq(3)', en: 'City', ru: 'Город', ua: 'Місто'},/*inner html*/
{selector: '#address-item-1 form label:eq(4)', en: 'Index', ru: 'Индекс', ua: 'Індекс'},/*inner html*/
{selector: '#address-item-1 form label:eq(5)', en: 'Street', ru: 'Улица', ua: 'Вулиця'},/*inner html*/
{selector: '#address-item-1 form label:eq(6)', en: 'Number of house', ru: 'Номер дома', ua: 'Номер будинку'},/*inner html*/
{selector: '#address-item-1 form label:eq(7)', en: 'Add some comments', ru: 'Комментарии', ua: 'Коментарі'},/*inner html*/
{selector: '#address-item-1 .ui-checkbox label', en: 'Address official registration', ru: 'Адрес по прописке', ua: 'Адреса за пропискою'},/*inner html*/
{selector: '#address-item-1 .btn-save', en: 'Save address', ru: 'Сохранить адрес', ua: 'Зберегти адресу'},/*inner html*/
{selector: '#address-item-1 .btn-delete', en: 'Delete address', ru: 'Удалить адрес', ua: 'Видалити адресу'},/*inner html*/
{selector: '#address-item-2 .ui-title', en: 'Edit Address2', ru: 'Редактировать адрес2', ua: 'Редагувати адресу 2'},/*inner html*/
{selector: '#address-item-2 .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#address-item-2 #findgps-2', en: 'Find an address using GPS', ru: 'Определить адрес по GPS', ua: 'Визначити адресу за допомогою GPS'},/*inner html*/
{selector: '#address-item-2 form label:eq(0)', en: 'Country', ru: 'Страна', ua: 'Держава'},/*inner html*/
{selector: '#address-item-2 form label:eq(1)', en: 'State', ru: 'Область', ua: 'Область'},/*inner html*/
{selector: '#address-item-2 form label:eq(2)', en: 'County', ru: 'Округ', ua: 'Округ'},/*inner html*/
{selector: '#address-item-2 form label:eq(3)', en: 'City', ru: 'Город', ua: 'Місто'},/*inner html*/
{selector: '#address-item-2 form label:eq(4)', en: 'Index', ru: 'Индекс', ua: 'Індекс'},/*inner html*/
{selector: '#address-item-2 form label:eq(5)', en: 'Street', ru: 'Улица', ua: 'Вулиця'},/*inner html*/
{selector: '#address-item-2 form label:eq(6)', en: 'Number of house', ru: 'Номер дома', ua: 'Номер будинку'},/*inner html*/
{selector: '#address-item-2 form label:eq(7)', en: 'Add some comments', ru: 'Комментарии', ua: 'Коментарі'},/*inner html*/
{selector: '#address-item-2 .ui-checkbox label', en: 'Address official registration', ru: 'Адрес по прописке', ua: 'Адреса за пропискою'},/*inner html*/
{selector: '#address-item-2 .btn-save', en: 'Save address', ru: 'Сохранить адрес', ua: 'Зберегти адресу'},/*inner html*/
{selector: '#address-item-2 .btn-delete', en: 'Delete address', ru: 'Удалить адрес', ua: 'Видалити адресу'},/*inner html*/
{selector: '#address-item-3 .ui-title', en: 'Edit Address3', ru: 'Редактировать адрес3', ua: 'Редагувати адресу3'},/*inner html*/
{selector: '#address-item-3 .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#address-item-3 #findgps-3', en: 'Find an address using GPS', ru: 'Определить адрес по GPS', ua: 'Визначити адресу за допомогою GPS'},/*inner html*/
{selector: '#address-item-3 form label:eq(0)', en: 'Country', ru: 'Страна', ua: 'Держава'},/*inner html*/
{selector: '#address-item-3 form label:eq(1)', en: 'State', ru: 'Область', ua: 'Область'},/*inner html*/
{selector: '#address-item-3 form label:eq(2)', en: 'County', ru: 'Округ', ua: 'Округ'},/*inner html*/
{selector: '#address-item-3 form label:eq(3)', en: 'City', ru: 'Город', ua: 'Місто'},/*inner html*/
{selector: '#address-item-3 form label:eq(4)', en: 'Index', ru: 'Индекс', ua: 'Індекс'},/*inner html*/
{selector: '#address-item-3 form label:eq(5)', en: 'Street', ru: 'Улица', ua: 'Вулиця'},/*inner html*/
{selector: '#address-item-3 form label:eq(6)', en: 'Number of house', ru: 'Номер дома', ua: 'Номер будинку'},/*inner html*/
{selector: '#address-item-3 form label:eq(7)', en: 'Add some comments', ru: 'Комментарии', ua: 'Коментарі'},/*inner html*/
{selector: '#address-item-3 .ui-checkbox label', en: 'Address official registration', ru: 'Адрес по прописке', ua: 'Адреса за пропискою'},/*inner html*/
{selector: '#address-item-3 .btn-save', en: 'Save address', ru: 'Сохранить адрес', ua: 'Зберегти адресу'},/*inner html*/
{selector: '#votings-page [name=sort] option:eq(0)', en: 'Sort by newest', ru: 'Сортировать по новизне', ua: 'Сортувати за новизною'},/*inner html*/
{selector: '#votings-page [name=sort] option:eq(1)', en: 'Sort by stars', ru: 'Сортировать по рейтингу', ua: 'Сортувати за рейтингом'},/*inner html*/
{selector: '#votings-page [name=sort] option:eq(2)', en: 'Sort by supported', ru: 'Сортировать по поддержке', ua: 'Сортувати за підтримкою'},/*inner html*/
{selector: '#votings-page [name=sort_direction] option:eq(0)', en: 'Sort down', ru: 'Сортировать по убыванию', ua: 'Сортувати за спаданням'},/*inner html*/
{selector: '#votings-page [name=sort_direction] option:eq(1)', en: 'Sort up', ru: 'Сортировать по возрастанию', ua: 'Сортувати за зростанням'},/*inner html*/
{selector: '#votings-page .ui-input-btn.ui-btn.ui-btn-icon-right.filter-normal span', 
	en: 'Filter', ru: 'Фильтровать', ua: 'Фільтрувати'},/*inner html*/
{selector: '#votings-page #filter_activator span', en: 'Filter is activated', ru: 'Фильтр активен', ua: 'Фільтр активний'},/*inner html*/
{selector: '#votings-page .ui-input-btn.ui-btn.ui-btn-icon-right.filter-clear span', 
	en: 'Clear filter', ru: 'Очистить фильтр', ua: 'Очистити фільтр'},/*inner html*/
{selector: '#filter-page .ui-title', en: 'Filter', ru: 'Фильтр', ua: 'Фільтр'},/*inner html*/
{selector: '#filter-page .ui-controlgroup-label:eq(0)', en: 'Enter first date for filter', ru: 'Введите дату начала выборки', ua: 'Введіть дату початку вибірки'},/*inner html*/
{selector: '#filter-page .ui-controlgroup-label:eq(1)', en: 'Enter last date for filter', ru: 'Введите дату окончания выборки', ua: 'Введіть дату кінця вибірки'},/*inner html*/
{selector: '#filter-page [href=#spheres-filters]', en: 'Choose spheres', ru: 'Выберите сферы', ua: 'Оберіть сфери'},/*inner html*/
{selector: '#filter-page .filter-save span', en: 'Apply filter', ru: 'Применить фильтр', ua: 'Задіяти фільтр'},/*inner html*/
{selector: '#filter-page .filter-clear span', en: 'Clear filter', ru: 'Очистить фильтр', ua: 'Очистити фільтр'},/*inner html*/
{selector: '#filter-page #filter-help .title', en: 'Description', ru: 'Детальнее', ua: 'Детальніше'},/*inner html*/
{selector: '#filter-page #filter-help .text', 
	en: 'This page can help you to choose sertain records using filter system or select every record', 
	ru: 'На этой странице вы можете настроить отображение голосований по вашему усмотрению или выбирать все записи без применения фильтра', 
	ua: 'Ця сторінка допоможе вам обрати саме ті голосування які вас цікавлять або обрати всі голосування без задіяння фільтру'},/*inner html*/
{selector: '#spheres-filters .ui-title:eq(0)', en: 'Spheres', ru: 'Сферы', ua: 'Сфери'},/*inner html*/
{selector: '#filter-page .ui-title', en: 'Filter', ru: 'Фильтр', ua: 'Фільтр'},/*inner html*/
{selector: '#my-fund-page .long-title', en: 'Personal Funds', ru: 'Персональные фонды', ua: 'Персональні фонди'},/*inner html*/
{selector: '#my-fund-page .section-title:eq(0)', en: 'Donate Personal Fund', ru: 'Пожертвовать в персональный фонд', ua: 'Пожертвувати до персонального фонду'},/*inner html*/
{selector: '#my-fund-page .section-title:eq(1)', en: 'Create Personal Fund', ru: 'Создать персональный фонд', ua: 'Створити персональний фонд'},/*inner html*/
{selector: '#my-fund-page .select-field:eq(0) label', en: 'Select Fund', ru: 'Выбрать фонд', ua: 'Обрати фонд'},/*inner html*/
{selector: '#my-fund-page .select-field:eq(1) label', en: 'Select Fund\'s Currency', ru: 'Выбрать валюту фонда', ua: 'Обрати валюту фонду'},/*inner html*/
{selector: '#my-fund-page .btn-save.ui-btn.ui-shadow.ui-corner-all', 
	en: 'Transfer Donation to Another User', 
	ru: 'Переслать пожертвование другому пользователю', 
	ua: 'Переслати пожертвування іншому користувачеві'},/*inner html*/
{selector: '#profile-page [name=user_password_old]', value: 'placeholder', en: 'Enter old password', ru: 'Введите старый пароль', ua: 'Введіть старий пароль'},/*placeholder*/
{selector: '#profile-page [name=user_password_new]', value: 'placeholder', en: 'Enter new password', ru: 'Введите новый пароль', ua: 'Введіть новий пароль'},/*placeholder*/
{selector: '#profile-page [name=user_password_repeat]', value: 'placeholder', en: 'Accept password', ru: 'Применить пароль', ua: 'Задіяти пароль'},/*placeholder*/
{selector: '#profile-page [name=user_password_old]', value: 'placeholder', en: 'Last name', ru: 'Фамилия', ua: 'Прізвище'},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: 'Имя', ua: 'Ім\'я'},/*placeholder*/
{selector: '#profile-page [name=ln]', value: 'placeholder', en: 'Last name', ru: 'Фамилия', ua: 'Прізвище'},/*placeholder*/
{selector: '#trust-list #searched_string', value: 'placeholder', en: 'Search by ID', ru: 'Поиск по ID', ua: 'Пошук за ID'},/*placeholder*/
{selector: '#create-vote [name=name]', value: 'placeholder', en: 'Name', ru: 'Название', ua: 'Найменування'},/*placeholder*/
{selector: '#create-vote [type=submit]:eq(0)', value: 'value', en: 'Create Vote', ru: 'Создать голосование', ua: 'Створити голосування'},/*value*/
{selector: '#spheres-address [type=submit]', value: 'value', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*value*/
{selector: '#my-fund-page [type=submit]:eq(0)', value: 'value', en: 'Create Personal Fund Now', ru: 'Создать персональный фонд сейчас', ua: 'Створити персональний фонд зараз'},/*value*/
{selector: '#votings-page #searched_string', value: 'placeholder', en: 'Search by ID or name', ru: 'Поиск по ID', ua: 'Пошук за ID'},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: 'Имя', ua: 'Ім\'я'},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: 'Имя', ua: 'Ім\'я'},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: 'Имя', ua: 'Ім\'я'},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: 'Имя', ua: 'Ім\'я'},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: 'Имя', ua: 'Ім\'я'},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: 'Имя', ua: 'Ім\'я'},/*placeholder*/
];
var LOCALE_ARRAY_ADDITIONAL = { email_not_much:{en: "Email_not_match", ru: "Имейл не совпадает", ua: "Імейл не співпадає"},
active: {en: "active", ru: "Активно", ua: "Активно"},
not_auth: {en: "not auth", ru: "Не авторизирован", ua: "Не авторизованний"},
delete_vote: {en: "Delete vote", ru: "Удалить голос", ua: "Видалити голос"},
choose_only_one_avatar: {en: "Ypu can choose only one avatar", ru: "Вы можете выбрать только один аватар", ua: "Вы можете обрати тільки один аватар"},
bad_format_or_size: {
	en: "Bad format of the file(jpeg and png only) or bigger than 150 kb", 
	ru: "Неправильный формат файла (только jpeg или png) или размер больше 150 kb", 
	ua: "Невірний формат файлу (тільки jpeg або png) або розмір більше 150 kb"},
bad_size: {en: "File is larger than the specified amount set", ru: "Файл больше чем установленный максимальный размер", ua: "Файл більше ніж встановлений максимальний розмір"},
enter_old_password: {en: "Please, enter old password", ru: "Пожалуйста, введите старый пароль", ua: "Будь ласка, введіть старий пароль"},
enter_new_password: {en: "Please, enter new password", ru: "Пожалуйста, введите новый пароль", ua: "Будь ласка, введіть новий пароль"},
repeat_new_password: {en: "Please, repeat new password", ru: "Пожалуйста, повторите новый пароль", ua: "Будь ласка, повторіть новий пароль"},
old_password_is_wrong: {en: "Your old password is wrong", ru: "Ваш старый пароль неверный ", ua: "Ваш старий пароль невірний"},
wrong_password_or_username: {en: "Wrong password or username", ru: "Неверный пароль или имя", ua: "Невірний пароль або ім\'я"},
user_does_not_exist: {en: "This user does not exist", ru: "Такого пользователя не существует", ua: "Такий користувач не існує"},
password_reset_successfully_sent: {
	en: "Password reset mail successfully sent!", 
	ru: "Письмо со сбросом пароля успешно выслано!",
	ua: "Лист зі скиданням паролю успішно вислано!"},
wrong_captcha: {en: "Captcha was wrong!", ru: "Защитный код неверный!", ua: "Невірний захисний код!"},
account_created: {
	en: "Your account has been created successfully and we have sent you an email. Please click the VERIFICATION LINK within that mail.", 
	ru: "Ваш профиль был успешно создан, мы выслали вам письмо на электронную почту. Пожалуйста, перейдите по ссылке VERIFICATION LINK в письме.", 
	ua: "Ваш профіль був успішно створений, ми надіслали вам листа електронною поштою. Будь ласка, перейдіть за посиланням VERIFICATION LINK в листові."},
voting_created: {en: "Voting was successfully created", ru: "Голосование было успешно создано",ua: "Голосування було успішно створене"},
gps_not_activated: {en: "GPS not activated", ru: "GPS не активирован", ua: "GPS не активований"},
type_general_offers: {en: "General offers", ru: "Общие предложения", ua: "Загальні пропозиції"},
type_local_authorities: {en: "Local authorities", ru: "Органы местного самоуправления", ua: "Органи мысцевого самоврядування"},
type_OSMD: {en: "OSMD", ru: "ОСМД", ua: "ОСББ"},
type_public_orrganization: {en: "Political Parties, Public organizations", ru: "Политические партии, Публичные организации", ua: "Політичні партії, Публічні організації"},
type_maidan: {en: "Maidan", ru: "Майдан", ua: "Майдан"},
type_primaries: {en: "Public primaries", ru: "Публичные праймериз", ua: "Публічні праймеріз"},
trust_vote: {en: "Trust vote", ru: "Доверить голос", ua: "Довірити голос"},
no_data: {en: "No data with this filter parameters", ru: "Нет данных для этих параметров фильтра", ua: "Немає данних для вибраних параметрів фільтру"},
january: {en: "January", ru: "Январь", ua: "Січень"},
february: {en: "February", ru: "Февраль", ua: "Лютий"},
march: {en: "March", ru: "Март", ua: "Березень"},
april: {en: "April", ru: "Апрель", ua: "Квітень"},
may: {en: "May", ru: "Май", ua: "Травень"},
june: {en: "June", ru: "Июнь", ua: "Червень"},
july: {en: "July", ru: "Июль", ua: "Липень"},
august: {en: "August", ru: "Август", ua: "Серпень"},
september: {en: "September", ru: "Сентябрь", ua: "Вересень"},
october: {en: "October", ru: "Октябрь", ua: "Жовтень"},
november: {en: "November", ru: "Ноябрь", ua: "Листопад"},
december: {en: "December", ru: "Декабрь", ua: "Грудень"},
choose_sphere: {en: "Choose sphere", ru: "Выберите сферу", ua: "Оберіть сферу"},
news_by: {en: "news by", ru: "Опубликовано", ua: "Опубліковано"},
support: {en: "Support", ru: "По поддержке", ua: "По підтримці"},
not_support: {en: "Not support", ru: "Не поддержано", ua: "Не підтримано"},
collect_supporters: {en: "collect_supporters ", ru: "Набирает поддержку", ua: "Збирає прихильників"},
supporters: {en: "supporters", ru: "Голосов поддержки", ua: "Голосів підтримки"},
time_voting: {en: "time_voting", ru: "Длится", ua: "Триває"},
all_voters: {en: "all_voters", ru: "Общее количество голосов", ua: "Загальна кількість голосів"},
voting_finished: {en: "voting_finished", ru: "Голосование завершено", ua: "Голосування завершено"},
voting_canceled: {en: "voting_canceled", ru: "Голосование отклонено", ua: "Голосування відхилено"},
description: {en: "Description", ru: "Детальнее", ua: "Детальніше"},
															
															/*NOT TRANSLATED 18.06.2015*/
help_collect_supports_or_canceled: {en: "help_collect_supports_or_canceled", ru: "help_collect_supports_or_canceled", ua: "help_collect_supports_or_canceled"},

share: {en: "Share", ru: "Доля", ua: "Частка"},
number_of_votes_support: {en: "Number of votes support", ru: "Количество голосов поддержки", ua: "Кількість голосів підтримки"},
discussion_of_voting: {en: "Discussion of voting", ru: "Обсуждение голосования", ua: "Обговорення голосування"},
yes_no_i_do_not_know: {en: "Vote yes, no or i don’t know:", ru: "Голосов 'Да','Нет' или 'Я не знаю':", ua: "Голосів 'Так','Ні' або 'Я не знаю':"},
yes: {en: "Yes", ru: "Да", ua: "Так"},
abstain: {en: "Abstain", ru: "Воздержался", ua: "Утримався"},
no: {en: "No", ru: "Нет", ua: "Ні"},
turn_to_open_anonymous: {en: "Turn on open (not anonymous) vote", ru: "Голосовать открыто", ua: "Голосувати відкрито"},
you_have_selected: {en: "You have selected ", ru: "Вы выбрали ", ua: "Ви обрали "},
anonymous: {en: "Anonymous", ru: "Анонимно", ua: "Анонімно"},
not_anonymus: {en: "Not anonymus", ru: "Открыто", ua: "Відкрито"},
anonymus: {en: "Anonymus", ru: "Аноним", ua: "Анонім"},
															
															/*NOT TRANSLATED 18.06.2015*/
help_voting_period_finished: {en: "help_voting_period_finished", ru: "help_voting_period_finished", ua: "help_voting_period_finished"},

by: {en: "By ", ru: "Создано ", ua: "Створено "},
sphere: {en: "Sphere", ru: "Сферой", ua: "Сферою"},
share_by_social_newtworks: {en: "Share by social Networks", ru: "Поделиться по социальным сетям", ua: "Поділитись за соціальними мережами"},
result_of_votes: {en: "Results of votes", ru: "Результаты голосования", ua: "Результати голосування"},
number_of_voters: {en: "Number of Voters", ru: "Количество голосующих", ua: "Кількість голосуючих"},
auth_by_email: {en: "Auth by email", ru: "Авторизация по email", ua: "Авторизація за email"},
social_network: {en: "Social Network", ru: "Социальная сеть", ua: "Соціальна мережа"},
by_payment: {en: "By payment", ru: "По платежу", ua: "За плеатежем"},
by_passport: {en: "By passport", ru: "По паспорту", ua: "За паспортом"},
community: {en: "Community", ru: "Гражданские обьединения", ua: "Громадські об\'єднання"},
co_owners: {en: "Сo-owners", ru: "Совладельцы", ua: "Співвласники"},
view_list_public_voters: {en: "View the list of public voters", ru: "Просмотреть список голосовавших открыто", ua: "Перешлянути список проголосувавших відкрито"},
voters: {en: "Voters", ru: "Голосовавших", ua: "Голосуючих"},
back: {en: "Back", ru: "Назад", ua: "Назад"},
ask: {en: "Ask", ru: "Запрос", ua: "Запит"},
help_voters_list: {en: "help_voters_list", ru: "Справка по списку голосования", ua: "Довідка по списку голосування"},
clear_text: {en: "Clear text", ru: "Очистить текст", ua: "Очистити текст"},
activate: {en: "Activate", ru: "Активировать", ua: "Активувати"},
deactivate: {en: "Deactivate", ru: "Деактивировать", ua: "Деактивувати"},
please_enter_name_voting: {
	en: "Please enter name of your voting", 
	ru: "Пожалуйста, напишите наименование вашего голосования", 
	ua: "Будь ласка, напишіть найменування вашого голосування"},
please_enter_description_voting: {
	en: "Please enter description of your voting", 
	ru: "Пожалуйста, напишите описание вашего голосования", 
	ua: "Будь ласка, напишіть описання вашого голосування"},
please_enter_sphere_voting: {
	en: "Please choose sphere of your voting", 
	ru: "Пожалуйста, выберите сферу вашего голосования", 
	ua: "Будь ласка, оберіть сферу вашого голосування"},
please_enter_image_voting: {
	en: "Please choose image of your voting", 
	ru: "Пожалуйста, добавьте аватар к вашему голосованию", 
	ua: "Будь ласка, додайте аватар до вашого голосування"},
please_enter_supporters_voting: {
	en: "Please enter count of needle supporters for your voting", 
	ru: "Пожалуйста, введите необходимое количество голосов поддержки для вашего голосования", 
	ua: "Будь ласка, введіть необхідну кількість голосів підтримки для вашого голосування"},
collect_cash: {en: "collect_cash", ru: "Сбор средств", ua: "Збір коштів"},
collect_cash_to: {en: "Collect cash to", ru: "Сбор средств до", ua: "Збір коштів до"},
amount_asking: {en: "amount_asking", ru: "Необходимое количество средств", ua: "Необхідна кількість коштів"},
amount_current: {en: "amount_current", ru: "Собрано на данный момент", ua: "Зібрано на данний момент"},
my_cash: {en: "my_cash", ru: "Мой вклад", ua: "Мій вклад"},
count_contractors: {en: "count_contractors", ru: "Количество подрядчиков", ua: "Кількість підрядників"},
successfully_finished: {en: "successfully_finished", ru: "Успешно завершено", ua: "Успішно закінчено"},
donate_successfull: {en: "Donate successfull", ru: "Пожертвование выполнено успешно", ua: "Пожертвування виконано успішно"},
warning_donate: {
	en: "Support in this currency is not avaliable for you. Create fund in this currency and donate funds.", 
	ru: "У вас нет возможности поддержать в этой валюте. Создайте фонд в этой валюте и зачислите средства.", 
	ua: "У вас намає можливості підтримки в даній валюті. Створіть фонд в цій валюті та зарахуйте кошти."},
saved_successfull: {en: "Saved successfull", ru: "Успешно сохранено", ua: "Успішно збережено"},
no_pif_history: {en: "Empty", ru: "Пусто", ua: "Пусто"},
weighted_vote: {en: "Weighted voting", ru: "Взвешенное голосование", ua: "Зважене голосування"},
vote: {en: "Voting", ru: "Голосование", ua: "Голосування"},
my_vote: {en: "My voting", ru: "Мой голос", ua: "Мій голос"},
project: {en: "Project", ru: "Проект", ua: "Проект"},
program: {en: "Program", ru: "Программа", ua: "Програма"},
request: {en: "Request", ru: "Запрос", ua: "Запит"},
project_proposition: {en: "Project proposition", ru: "Проектное предложение", ua: "Проектна пропозиція"},
create_weighted_vote: {en: "Create weighted voting", ru: "Создать взвешенное голосование", ua: "Створити зважене голосування"},
create_project_proposition: {en: "Create project proposition", ru: "Создать проектное предложение", ua: "Створити проектну пропозицію"},
create_project: {en: "Create project", ru: "Создать проект", ua: "Створити проект"},
create_program: {en: "Create program", ru: "Создать программу", ua: "Створити програму"},
create_request: {en: "Create request", ru: "Создать запрос", ua: "Створити запит"},
name_of_your_weighted_vote: {en: "Name of your weighted voting", ru: "Назовите ваше взвешенное голосование", ua: "Назвіть ваше зважене голосування"},
name_of_your_project_proposition: {en: "Name of your project proposition", ru: "Назовите ваше проектное предложение", ua: "Назвіть вашу проектну пропозицію"},
name_of_your_project: {en: "Name of your project", ru: "Назовите ваш проект", ua: "Назвіть ваш проект"},
name_of_your_program: {en: "Name of your program", ru: "Назовите вашу программу", ua: "Назвіть вашу програму"},
name_of_your_request: {en: "Name of your request", ru: "Назовите ваш запрос", ua: "Назвіть ваш запит"},
transaction_okay: {en: "Transaction successfull", ru: "Транзакция успешна", ua: "Транзакція успішна"},
create_fund_question: {
	en: " Are you sure want to create new Personal Fund?", 
	ru: " Вы действительно хотите создать персональный фонд?", 
	ua: " Ви дістно хочете створити персональний фонд?"},
transaction_question: {
	en: "Are you sure want to donate this user? Presonal Donations are not returneble!", 
	ru: "Вы действительно хотите пожертвовать этому пользователю? Персональные пожертвования невозвратны!", 
	ua: "Ви дійсно хочете пожертвувати цьому користувачеві? Персональні пожертвування не повертаються!"},
return_donate_successfull: {en: "Return donate successfull", ru: "Возврат пожертвования успешен", ua: "Повернення пожертвування успішне"},
votings_by_sphere: {en: "Votings by spheres", ru: "Голосование по сферам", ua: "Голосування за сферами"},
local_self_goverments_indicative: {
	en: "Local self-governments indicative", 
	ru: "Индикативные голосования по вопросам органиов местного самоуправления", 
	ua: "Індикативні голосування з питань органів місцевого самоврядування"},
elections: {en: "Elections", ru: "Выбори", ua: "Вибори"},
candidates_proposal: {en: "Candidates\' rating (Public proposal)", ru: "Предложения по кандидатам", ua: "Пропозиції по кандидатам"},
candidates_parties: {en: "Candidates\' rating (Political Parties)", ru: "Партийные кандидаты", ua: "Партійні кандидати"},
local_self_goverments: {
	en: "Local self-governments", 
	ru: "Голосования по вопросам огрганов местного самоуправления", 
	ua: "Голосування з питань органів місцевого самоврядування"},};
